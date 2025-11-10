import { useState, useCallback, useRef, useEffect } from 'react';
import { message as antMessage } from 'antd';
import { sendMessage } from '@/api/aiAssistant';
import type { ChatMessage } from '@/types/aiAssistant';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 发送消息
  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // 添加用户消息
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await sendMessage({ message: content.trim() });

        if (response.code === 0) {
          const { messageId, stages } = response.data;

          // 添加AI消息
          const assistantMessage: ChatMessage = {
            id: messageId,
            role: 'assistant',
            content: stages[stages.length - 1]?.content || '',
            timestamp: Date.now(),
            stages,
          };

          setMessages(prev => [...prev, assistantMessage]);
          setStreamingMessageId(messageId);

          // 模拟阶段流式展示
          // 实际实现在组件中处理
        } else {
          antMessage.error('发送失败，请重试');
        }
      } catch (error) {
        console.error('发送消息失败:', error);
        antMessage.error('发送失败，请检查网络连接');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  // 清空对话
  const clearMessages = useCallback(() => {
    setMessages([]);
    setStreamingMessageId(null);
  }, []);

  return {
    messages,
    isLoading,
    streamingMessageId,
    messagesEndRef,
    handleSendMessage,
    clearMessages,
  };
};

