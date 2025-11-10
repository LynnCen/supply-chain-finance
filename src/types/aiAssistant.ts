// 消息角色
export type MessageRole = 'user' | 'assistant';

// 思考阶段类型
export type StageType = 'thinking' | 'analyzing' | 'planning' | 'executing' | 'completed';

// 阶段状态
export type StageStatus = 'pending' | 'processing' | 'done';

// 思考阶段
export interface ThinkingStage {
  id: string;
  type: StageType;
  title: string;
  content: string;
  status: StageStatus;
  timestamp: number;
}

// 消息
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  stages?: ThinkingStage[];
}

// 聊天请求
export interface ChatRequest {
  message: string;
  conversationId?: string;
}

// 聊天响应
export interface ChatResponse {
  messageId: string;
  content: string;
  stages: ThinkingStage[];
}
