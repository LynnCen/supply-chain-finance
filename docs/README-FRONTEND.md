# 供应链金融管理系统 - 前端

## 项目简介

供应链金融管理后台系统的前端项目，基于React + TypeScript + Vite构建。

## 技术栈

- **核心框架**: React 18 + TypeScript 5
- **构建工具**: Vite 7
- **UI框架**: Ant Design 5 + TailwindCSS 4
- **路由**: React Router 7
- **状态管理**: Zustand 5
- **请求库**: Axios + ahooks
- **Mock数据**: MSW (Mock Service Worker)
- **代码规范**: ESLint + Prettier

## 项目结构

```
src/
├── api/                    # API接口定义
├── assets/                 # 静态资源
├── components/             # 公共组件
├── layouts/                # 布局组件
│   ├── BasicLayout.tsx    # 基础布局
│   ├── Header.tsx         # 顶部栏
│   └── Sidebar.tsx        # 侧边栏
├── pages/                  # 页面组件
│   ├── DataManagement/    # 数据管理
│   ├── EnterpriseDashboard/ # 企业看板
│   ├── AnalysisReport/    # 分析报告
│   ├── FinanceManagement/ # 财务管理
│   └── Messages/          # 消息
├── router/                 # 路由配置
├── stores/                 # Zustand状态管理
├── utils/                  # 工具函数
├── types/                  # TypeScript类型
├── mocks/                  # MSW Mock数据
└── styles/                 # 全局样式
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

项目将在 http://localhost:3000 启动

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## 功能模块

### 1. 数据管理
- 路径: `/data-management`
- 功能: 交易记录、贷款记录等数据管理

### 2. 企业看板
- 路径: `/enterprise-dashboard`
- 功能: 企业信用评分、风险预警展示

### 3. 分析报告
- 路径: `/analysis-report`
- 功能: 信用报告、供应链分析报告

### 4. 财务管理
- 路径: `/finance-management`
- 功能: 还款计划、财务分析

### 5. 消息
- 路径: `/messages`
- 功能: 系统通知、预警消息

## Mock数据

项目使用MSW进行API Mock：

- Mock配置位于 `src/mocks/` 目录
- 开发环境自动启用Mock
- 可在 `src/mocks/handlers/` 添加新的Mock接口

## 样式说明

- Ant Design: 用于UI组件（表格、表单、模态框等）
- TailwindCSS: 用于布局和自定义样式（使用 `tw-` 前缀）

示例:
```tsx
<div className="tw-flex tw-items-center tw-gap-4">
  <Button type="primary">Ant Design按钮</Button>
</div>
```

## 状态管理

使用Zustand进行状态管理，示例:

```tsx
import { useGlobalStore } from '@/stores/useGlobalStore';

function Component() {
  const { collapsed, toggleCollapsed } = useGlobalStore();
  // ...
}
```

## 开发规范

- 使用TypeScript严格模式
- 遵循ESLint和Prettier配置
- 组件使用函数式组件 + Hooks
- 路径别名使用 `@/` 指向 `src/`

## 注意事项

1. TailwindCSS使用 `tw-` 前缀避免与Ant Design样式冲突
2. 所有API请求通过 `src/utils/request.ts` 统一处理
3. 开发环境使用MSW Mock数据，生产环境需配置真实API

## 后续开发

框架已搭建完成，各模块页面骨架已创建。后续可在各页面目录下添加具体业务组件和逻辑。


