# 供应链金融系统 - 前端技术执行方案

## 一、项目概述

**项目名称：** 供应链金融管理后台系统  
**目标：** 搭建基础框架，实现侧边栏导航和页面级路由，为后续业务模块填充做准备

## 二、技术栈

### 核心框架
- React 18 + TypeScript 5.x
- Vite 5.x

### UI与样式
- Ant Design 5.x (组件库)
- TailwindCSS 3.x (布局与自定义样式，prefix: 'tw-')

### 路由与状态
- React Router 6.x (页面路由)
- Zustand 4.x (状态管理)

### 数据请求
- axios (HTTP客户端)
- ahooks (React Hooks工具集)

### 开发工具
- MSW (Mock Service Worker)
- ESLint + Prettier

## 三、路由模块规划

```
├── 数据管理 (/data-management)
├── 企业看板 (/enterprise-dashboard)
├── 分析报告 (/analysis-report)
├── 财务管理 (/finance-management)
└── 消息 (/messages)
```

## 四、项目结构

```
supply-chain-finance-admin/
├── public/
│   └── mockServiceWorker.js
├── src/
│   ├── api/                    # API接口
│   ├── assets/                 # 静态资源
│   ├── components/             # 公共组件
│   ├── layouts/                # 布局组件
│   │   ├── BasicLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── pages/                  # 页面组件
│   │   ├── DataManagement/
│   │   ├── EnterpriseDashboard/
│   │   ├── AnalysisReport/
│   │   ├── FinanceManagement/
│   │   └── Messages/
│   ├── router/                 # 路由配置
│   ├── stores/                 # Zustand状态
│   ├── utils/                  # 工具函数
│   ├── types/                  # TS类型定义
│   ├── mocks/                  # MSW Mock
│   ├── styles/                 # 全局样式
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 五、实施步骤

### 阶段一：项目初始化
1. 创建Vite项目
2. 安装核心依赖
3. 配置TypeScript、ESLint、Prettier

### 阶段二：样式系统配置
4. 集成Ant Design
5. 配置TailwindCSS (带prefix)
6. 解决样式冲突

### 阶段三：路由与布局
7. 配置React Router
8. 实现BasicLayout (Header + Sidebar + Content)
9. 配置侧边栏菜单和路由映射

### 阶段四：Mock系统
10. 安装并初始化MSW
11. 创建基础Mock Handler结构
12. 配置开发环境启动Mock

### 阶段五：页面骨架
13. 创建5个模块的页面骨架
14. 配置路由导航
15. 验证框架完整性

## 六、技术要点

### 1. TailwindCSS与Ant Design共存
```js
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false, // 禁用样式重置
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}
```

### 2. 路由配置示例
```tsx
const routes = [
  { path: '/data-management', name: '数据管理', icon: <DatabaseOutlined /> },
  { path: '/enterprise-dashboard', name: '企业看板', icon: <DashboardOutlined /> },
  { path: '/analysis-report', name: '分析报告', icon: <FileTextOutlined /> },
  { path: '/finance-management', name: '财务管理', icon: <AccountBookOutlined /> },
  { path: '/messages', name: '消息', icon: <MessageOutlined /> },
]
```

### 3. Zustand状态管理示例
```tsx
// stores/useGlobalStore.ts
export const useGlobalStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}))
```

### 4. MSW Mock配置
```tsx
// mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

## 七、验收标准

- ✅ 项目可正常启动运行
- ✅ 侧边栏显示5个模块菜单
- ✅ 点击菜单可切换路由和页面
- ✅ 布局响应式，侧边栏可折叠
- ✅ ESLint和Prettier正常工作
- ✅ MSW Mock系统可用
- ✅ 代码结构清晰，符合规范

## 八、后续扩展

框架搭建完成后，可按模块逐步填充业务内容：
- 数据管理：交易记录、贷款记录管理
- 企业看板：企业信用评分、风险预警
- 分析报告：信用报告、供应链分析
- 财务管理：还款计划、财务分析
- 消息：系统通知、预警消息


