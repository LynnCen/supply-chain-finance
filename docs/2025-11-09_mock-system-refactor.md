# Mock 系统改造说明

**改造日期**: 2025-11-09  
**改造目标**: 将 Mock 系统从内存级别改造为基于 MSW 的网络层拦截

## 改造内容

### 1. 架构调整

**改造前**:
- 使用自定义的 `useQuery` Hook 进行内存级别的 mock
- Mock 数据定义在 API 配置中（`ApiConfig.mockData`）
- MSW 已配置但未实际使用

**改造后**:
- 移除 `useQuery` Hook，直接使用 ahooks 的 `useRequest`
- 简化 API 接口定义，只保留真实接口调用逻辑
- 所有 Mock 逻辑和数据迁移到 MSW handlers
- Mock 在浏览器 Service Worker 层拦截网络请求

### 2. 文件变更

#### 修改的文件

1. **src/api/user.ts**
   - 移除 `ApiConfig` 类型
   - 移除 `mockData` 配置
   - 将接口改为直接函数导出
   - 保持与后端 API 完全一致的签名

2. **src/mocks/handlers/user.ts**
   - 新增 `login` handler，实现登录验证逻辑
   - 支持动态响应和参数验证
   - 从 JSON 文件读取 mock 数据

3. **src/mocks/data/user.json**
   - 修正 name 字段数据（移除错误的前缀）

4. **src/layouts/Header.tsx**
   - 改用 `useRequest` 替代 `useQuery`
   - 添加类型断言确保类型安全

#### 删除的文件

- **src/hooks/useQuery.ts** - 不再需要自定义 Hook

### 3. 使用方式

#### 业务层调用（无需修改）

```typescript
// 在组件中使用
import { useRequest } from 'ahooks';
import { getUserInfo } from '@/api/user';

const { data, loading } = useRequest(getUserInfo, {
  onSuccess: (data) => {
    console.log('成功:', data);
  },
  onError: (error) => {
    console.error('失败:', error);
  },
});
```

#### 控制 Mock 开关

在 `src/config/index.ts` 中设置：

```typescript
// 开启 Mock - MSW 会拦截所有请求并返回 mock 数据
export const ENABLE_MOCK = true;

// 关闭 Mock - 请求直达后端服务器
export const ENABLE_MOCK = false;
```

### 4. 技术优势

#### 真实的网络模拟
- 请求会真实发出，在 Service Worker 层被拦截
- 可以在浏览器 Network 面板查看请求
- 支持测试加载状态、网络延迟、错误处理等

#### 清晰的职责分离
- **API 层**: 纯粹的接口定义，与后端契约一致
- **Mock 层**: 独立的 mock 实现，便于维护
- **业务层**: 不感知 mock 实现细节

#### 无缝后端对接
- 接口签名与后端完全一致
- 关闭 `ENABLE_MOCK` 后直接使用真实后端
- 类型定义统一，避免前后端不一致

#### 更好的开发体验
- Mock 数据集中管理
- 支持复杂的 mock 逻辑（验证、分页、搜索等）
- 便于团队协作和共享

### 5. Mock Handler 示例

```typescript
// src/mocks/handlers/user.ts
import { http, HttpResponse } from 'msw';
import userData from '../data/user.json';
import type { LoginParams } from '@/types/user';

export const userHandlers = [
  // 获取用户信息
  http.get('/api/user/info', () => {
    return HttpResponse.json({
      code: 0,
      data: userData.userInfo,
      message: 'success',
    });
  }),

  // 用户登录（支持动态验证）
  http.post('/api/user/login', async ({ request }) => {
    const data = await request.json() as LoginParams;
    
    if (data.username === 'admin' && data.password === '123456') {
      return HttpResponse.json({
        code: 0,
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: userData.userInfo,
        },
        message: '登录成功',
      });
    }
    
    return HttpResponse.json({
      code: 1001,
      data: null,
      message: '用户名或密码错误',
    }, { status: 401 });
  }),
];
```

### 6. 接口定义示例

```typescript
// src/api/user.ts
import request from '@/utils/request';
import type { ApiResponse } from '@/types/common';
import type { UserInfo, LoginParams, LoginResult } from '@/types/user';

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get<ApiResponse<UserInfo>>('/user/info');
}

/**
 * 用户登录
 */
export function login(data: LoginParams) {
  return request.post<ApiResponse<LoginResult>>('/user/login', data);
}

/**
 * 用户登出
 */
export function logout() {
  return request.post<ApiResponse<null>>('/user/logout');
}
```

### 7. 后续扩展

#### 添加新的 Mock 接口

1. 在对应的 handler 文件中添加新的 handler
2. 在 `src/mocks/data/` 中添加对应的 JSON 数据（可选）
3. 在 `src/api/` 中定义接口函数

#### 模拟复杂场景

```typescript
// 模拟网络延迟
http.get('/api/data', async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return HttpResponse.json({ data: 'delayed response' });
});

// 模拟错误
http.get('/api/error', () => {
  return HttpResponse.json(
    { code: 500, message: 'Server Error' },
    { status: 500 }
  );
});

// 模拟分页
http.get('/api/list', ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
  
  return HttpResponse.json({
    list: mockData.slice((page - 1) * pageSize, page * pageSize),
    total: mockData.length,
    page,
    pageSize,
  });
});
```

## 验证清单

- [x] 修改 Mock 数据文件
- [x] 完善 MSW Handlers
- [x] 简化 API 接口定义
- [x] 删除自定义 useQuery Hook
- [x] 更新业务层调用
- [x] 修复 TypeScript 类型错误
- [x] 启动开发服务器验证

## 测试建议

1. 启动开发服务器: `pnpm dev`
2. 打开浏览器 Network 面板
3. 验证请求被 MSW 拦截（会有 "from service worker" 标记）
4. 修改 `ENABLE_MOCK = false` 验证真实请求
5. 测试各种接口场景（成功、失败、加载状态等）

## 注意事项

- MSW 只在开发环境启动（`import.meta.env.DEV`）
- 生产环境不会包含 MSW 相关代码
- Mock 数据应与后端 API 响应结构保持一致
- 建议定期与后端同步接口变更

