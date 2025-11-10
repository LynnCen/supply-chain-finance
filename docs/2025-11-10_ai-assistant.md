# AI助手机器人功能开发文档

## 开发日期
2025-11-10

## 功能概述
在供应链金融管理系统中新增AI助手机器人功能，提供智能对话、问题分析、功能引导等服务。

## 技术栈
- **UI框架**: Ant Design 5.28.0 + React 19.2.0
- **状态管理**: Zustand 5.0.8
- **样式方案**: Tailwind CSS 3.4.0
- **Mock系统**: MSW 2.12.0
- **Hooks库**: ahooks 3.9.6

## 文件结构

```
src/
├── types/
│   └── aiAssistant.ts                       # AI助手类型定义
├── api/
│   └── aiAssistant.ts                       # API接口
├── stores/
│   └── useGlobalStore.ts                    # 全局状态（已扩展）
├── components/
│   └── AIAssistant/
│       ├── index.tsx                        # 主组件
│       ├── FloatingButton.tsx               # 浮动按钮
│       ├── ChatWindow.tsx                   # 聊天窗口
│       ├── ChatHeader.tsx                   # 窗口头部
│       ├── MessageList.tsx                  # 消息列表
│       ├── UserMessage.tsx                  # 用户消息
│       ├── AssistantMessage.tsx             # AI消息
│       ├── ThinkingStageCard.tsx            # 思考阶段卡片
│       ├── ChatInput.tsx                    # 输入框
│       ├── constants.ts                     # 常量配置
│       └── hooks/
│           ├── useChat.ts                   # 聊天逻辑Hook
│           └── useStreamingMessage.ts       # 流式消息Hook
└── mocks/
    ├── data/
    │   └── aiAssistant.json                 # Mock数据
    └── handlers/
        └── aiAssistant.ts                   # Mock处理器
```

## 核心功能

### 1. 浮动入口按钮
- **位置**: 页面右下角固定定位
- **样式**: 蓝紫渐变圆形按钮，机器人图标
- **交互**: 
  - 点击打开聊天窗口
  - 支持徽章显示未读消息
  - Hover放大效果

### 2. 聊天窗口
- **尺寸**: 400px × 600px
- **功能**:
  - 展开/最小化/关闭
  - 最小化时仅显示头部
  - 渐变色头部设计
  - 平滑动画过渡

### 3. 消息系统
#### 用户消息
- 蓝色气泡右对齐
- 显示发送时间
- 支持换行文本

#### AI消息
- 左对齐布局
- 机器人头像
- 思考阶段卡片展示
- 流式打字机效果

### 4. 思考阶段卡片
AI回复分为5个阶段，每个阶段用不同颜色的卡片展示：

| 阶段 | 图标 | 颜色 | 说明 |
|------|------|------|------|
| thinking | 🤔 | 紫色 | 思考中 |
| analyzing | 🔍 | 蓝色 | 分析中 |
| planning | 📋 | 青色 | 规划中 |
| executing | ⚡ | 绿色 | 执行中 |
| completed | ✓ | 灰色 | 已完成 |

### 5. 流式渲染
- **打字机效果**: 30ms/字符
- **自动滚动**: 新消息自动滚动到底部
- **加载动画**: 三点跳动动画
- **可中断**: 支持跳过流式动画

### 6. Mock数据场景
预设多个对话场景：

#### 场景1：数据分析
**关键词**: 数据、分析、统计
**回复**: 介绍数据管理功能

#### 场景2：企业看板
**关键词**: 企业、看板、dashboard
**回复**: 介绍企业看板功能

#### 场景3：帮助功能
**关键词**: 帮助、功能、怎么用、如何
**回复**: 系统功能总览

#### 默认场景
其他问题使用通用回复

## 数据结构

### 消息类型
```typescript
interface ChatMessage {
  id: string;                    // 消息ID
  role: 'user' | 'assistant';    // 角色
  content: string;               // 内容
  timestamp: number;             // 时间戳
  stages?: ThinkingStage[];      // AI消息的思考阶段
}
```

### 思考阶段
```typescript
interface ThinkingStage {
  id: string;                    // 阶段ID
  type: StageType;               // 阶段类型
  title: string;                 // 标题
  content: string;               // 内容
  status: StageStatus;           // 状态
  timestamp: number;             // 时间戳
}
```

## API接口

### 发送消息
```typescript
POST /api/aiAssistant/chat
Request: {
  message: string;
  conversationId?: string;
}
Response: {
  code: 0,
  data: {
    messageId: string;
    content: string;
    stages: ThinkingStage[];
  },
  message: 'success'
}
```

### 获取历史（预留）
```typescript
GET /api/aiAssistant/history
```

## 全局状态管理

新增AI助手相关状态：

```typescript
interface GlobalState {
  // ... 原有状态
  
  // AI助手状态
  aiAssistantOpen: boolean;
  aiAssistantMinimized: boolean;
  openAIAssistant: () => void;
  closeAIAssistant: () => void;
  toggleAIAssistant: () => void;
  minimizeAIAssistant: () => void;
  maximizeAIAssistant: () => void;
}
```

## 使用方法

### 基本使用
组件已集成到`BasicLayout`，在所有页面自动可用：

1. 点击右下角机器人图标打开聊天窗口
2. 在输入框输入消息
3. 按Enter发送（Shift+Enter换行）
4. 查看AI的思考阶段和回复
5. 点击最小化按钮收起窗口
6. 点击关闭按钮关闭助手

### 编程调用
```typescript
import { useGlobalStore } from '@/stores/useGlobalStore';

function Component() {
  const { openAIAssistant, closeAIAssistant } = useGlobalStore();
  
  // 打开AI助手
  const handleOpenAssistant = () => {
    openAIAssistant();
  };
  
  // 关闭AI助手
  const handleCloseAssistant = () => {
    closeAIAssistant();
  };
}
```

## 视觉设计特色

### 配色方案
- **主按钮**: 蓝色到紫色渐变 (#1677ff → #722ed1)
- **窗口**: 白色背景 + 柔和阴影
- **用户消息**: 蓝色气泡 (#1677ff)
- **AI消息**: 白色背景 + 灰色边框
- **阶段卡片**: 5种渐变色

### 动画效果
- 按钮Hover放大
- 窗口展开/收起过渡
- 打字机流式效果
- 加载三点跳动
- 平滑滚动

### 响应式设计
- 固定窗口尺寸（400×600）
- 自适应消息高度
- 输入框自动调整（1-4行）
- 消息列表自动滚动

## 性能优化

1. **懒加载**: 组件仅在挂载时初始化
2. **防抖处理**: 输入事件防抖
3. **虚拟滚动**: 预留大量消息场景
4. **内存管理**: 清理定时器和副作用
5. **React优化**: useMemo、useCallback

## 扩展建议

### 短期优化
1. 添加消息操作（复制、重新生成）
2. 支持富文本和代码高亮
3. 添加快捷回复按钮
4. 支持语音输入
5. 消息历史持久化

### 长期规划
1. 接入真实AI服务（OpenAI、Claude等）
2. 支持文件上传和图片识别
3. 实现多轮对话上下文
4. 智能功能推荐
5. 用户偏好学习

## 接入真实API指南

当前使用Mock数据，接入真实API时：

1. **修改API接口**:
```typescript
// src/api/aiAssistant.ts
export const sendMessage = (data: ChatRequest) => {
  // 改为真实API地址
  return request.post<ChatResponse>('/your-api/chat', data);
};
```

2. **支持SSE流式响应**:
```typescript
// 使用EventSource或fetch stream
const eventSource = new EventSource('/api/chat/stream');
eventSource.onmessage = (event) => {
  // 处理流式数据
};
```

3. **更新Mock Handler**:
```typescript
// 禁用或删除Mock处理器
// src/mocks/handlers/index.ts
export const handlers = [
  // ...aiAssistantHandlers, // 注释掉
];
```

## 测试建议

1. **功能测试**:
   - 发送消息正常
   - 流式渲染正常
   - 窗口展开/收起/关闭
   - 最小化后恢复

2. **交互测试**:
   - Enter发送消息
   - Shift+Enter换行
   - 自动滚动到底部
   - 加载状态显示

3. **场景测试**:
   - 测试各关键词匹配
   - 测试默认回复
   - 测试长文本处理
   - 测试快速连续发送

4. **兼容性测试**:
   - Chrome/Safari/Firefox
   - 不同分辨率
   - 移动端适配（预留）

## 注意事项

1. **状态管理**: 助手状态通过Zustand全局管理，确保各组件同步
2. **内存泄漏**: 定时器和副作用已正确清理
3. **性能**: 大量消息时考虑虚拟滚动
4. **安全**: 真实API需要添加认证和内容过滤
5. **隐私**: 敏感对话内容需要加密传输

## 开发总结

### 已完成功能 ✅
- ✅ 右下角浮动按钮
- ✅ 聊天窗口（展开/最小化/关闭）
- ✅ 用户消息和AI消息组件
- ✅ 5种思考阶段卡片
- ✅ 流式打字机效果
- ✅ 完整的Mock数据系统
- ✅ 全局状态管理
- ✅ 响应式设计
- ✅ 平滑动画效果
- ✅ TypeScript类型安全

### 代码质量
- 无Linter错误
- 完整的TypeScript类型定义
- 清晰的组件职责划分
- 统一的代码风格
- 符合项目架构规范

### 文件统计
- 新增文件: 18个
- 修改文件: 2个
- 代码行数: ~1000行
- 组件数量: 9个
- Hooks数量: 2个

## 快速开始

1. 启动开发服务器:
```bash
pnpm dev
```

2. 访问任意页面，点击右下角机器人图标

3. 尝试以下问题测试功能:
   - "数据分析功能怎么用？"
   - "企业看板有什么功能？"
   - "系统有哪些帮助？"
   - 任意其他问题

4. 观察AI的思考阶段和流式回复效果

## 相关文档
- [项目README](../README.md)
- [前端技术方案](./frontend-tech-plan.md)
- [企业看板文档](./2025-11-10_enterprise-dashboard.md)

