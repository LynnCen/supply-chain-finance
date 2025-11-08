# 快速启动指南

## ✅ 已完成的工作

前端基础框架已搭建完成，包含以下内容：

### 1. 项目初始化
- ✅ Vite + React + TypeScript 项目结构
- ✅ 所有核心依赖包安装完成
- ✅ TypeScript、ESLint、Prettier 配置完成

### 2. 样式系统
- ✅ TailwindCSS 配置（使用 `tw-` 前缀）
- ✅ Ant Design 集成
- ✅ 全局样式设置

### 3. 路由与布局
- ✅ React Router 路由配置
- ✅ 基础布局（Header + Sidebar + Content）
- ✅ 侧边栏菜单（5个模块）

### 4. 状态管理
- ✅ Zustand 全局状态管理
- ✅ 侧边栏折叠状态管理

### 5. Mock 系统
- ✅ MSW (Mock Service Worker) 配置
- ✅ Mock Handler 结构
- ✅ 开发环境自动启用

### 6. 页面骨架
- ✅ 数据管理页面
- ✅ 企业看板页面
- ✅ 分析报告页面
- ✅ 财务管理页面
- ✅ 消息页面

## 🚀 如何启动

### 第一次启动

```bash
# 1. 安装依赖（如果还没安装）
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 打开浏览器访问 http://localhost:3000
```

### 常用命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 📁 项目结构

```
supply-chain-finance/
├── public/                 # 静态资源
│   └── mockServiceWorker.js  # MSW Worker
├── src/
│   ├── api/               # API接口定义（待填充）
│   ├── assets/            # 图片等资源
│   ├── components/        # 公共组件（待填充）
│   ├── layouts/           # 布局组件 ✅
│   ├── pages/             # 页面组件 ✅（骨架已完成）
│   ├── router/            # 路由配置 ✅
│   ├── stores/            # 状态管理 ✅
│   ├── utils/             # 工具函数 ✅
│   ├── types/             # TS类型定义 ✅
│   ├── mocks/             # Mock数据 ✅
│   └── styles/            # 样式文件 ✅
├── .gitignore            # Git忽略配置 ✅
├── eslint.config.js      # ESLint配置 ✅
├── .prettierrc           # Prettier配置 ✅
├── tailwind.config.js    # Tailwind配置 ✅
├── tsconfig.json         # TS配置 ✅
└── vite.config.ts        # Vite配置 ✅
```

## 🎯 当前状态

**框架搭建状态**: ✅ 完成

**页面状态**:
- 数据管理: 📄 骨架完成，待填充内容
- 企业看板: 📄 骨架完成，待填充内容
- 分析报告: 📄 骨架完成，待填充内容
- 财务管理: 📄 骨架完成，待填充内容
- 消息: 📄 骨架完成，待填充内容

## 📝 后续开发建议

### 1. 数据管理模块
在 `src/pages/DataManagement/` 下添加：
- 交易记录列表组件
- 贷款记录列表组件
- 数据详情组件
- 相关Mock数据

### 2. 企业看板模块
在 `src/pages/EnterpriseDashboard/` 下添加：
- 企业信用卡片组件
- 风险预警组件
- 图表组件
- 相关Mock数据

### 3. 其他模块
类似地在各自目录下添加业务组件

### 4. Mock数据扩展
在 `src/mocks/handlers/` 下添加：
- `data.ts` - 数据管理相关API
- `dashboard.ts` - 企业看板相关API
- `report.ts` - 分析报告相关API
- `finance.ts` - 财务管理相关API
- `message.ts` - 消息相关API

## 🔍 验收检查

- ✅ 项目可正常启动
- ✅ 侧边栏显示5个模块菜单
- ✅ 点击菜单可切换路由
- ✅ 页面显示对应模块标题
- ✅ 侧边栏可折叠/展开
- ✅ TailwindCSS（tw-前缀）正常工作
- ✅ Ant Design 组件正常显示
- ✅ MSW Mock 系统可用

## 💡 技术要点

### TailwindCSS 使用
所有TailwindCSS类都需要 `tw-` 前缀：
```tsx
<div className="tw-flex tw-items-center tw-gap-4">
  <span className="tw-text-xl">内容</span>
</div>
```

### 状态管理
```tsx
import { useGlobalStore } from '@/stores/useGlobalStore';

function Component() {
  const { collapsed, toggleCollapsed } = useGlobalStore();
  // 使用状态...
}
```

### API请求
```tsx
import { useRequest } from 'ahooks';
import request from '@/utils/request';

function Component() {
  const { data, loading } = useRequest(() => 
    request.get('/api/example')
  );
}
```

## 📞 问题排查

如果遇到问题：

1. **端口被占用**: 修改 `vite.config.ts` 中的 `server.port`
2. **依赖安装失败**: 删除 `node_modules` 和 `pnpm-lock.yaml` 后重新安装
3. **样式不生效**: 检查是否使用了 `tw-` 前缀
4. **路由404**: 检查路由配置是否正确

## 🎉 开始开发

框架已就绪，现在可以开始填充业务内容了！


