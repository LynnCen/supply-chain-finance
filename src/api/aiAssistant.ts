import request from '@/utils/request';
import type { ChatRequest, ChatResponse } from '@/types/aiAssistant';
import type { ApiResponse } from '@/types/common';

// 发送消息
export const sendMessage = (data: ChatRequest) => {
  return request.post<ChatResponse>('/aiAssistant/chat', data);
};

// 获取历史记录（预留）
export const getChatHistory = () => {
  return request.get('/aiAssistant/history');
};

