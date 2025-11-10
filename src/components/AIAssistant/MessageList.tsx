import { Empty } from 'antd';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import type { ChatMessage } from '@/types/aiAssistant';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  streamingMessageId: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  streamingMessageId,
  messagesEndRef,
}) => {
  return (
    <div className="tw-flex-1 tw-overflow-y-auto tw-px-4 tw-py-4 tw-bg-gray-50">
      {messages.length === 0 ? (
        <div className="tw-h-full tw-flex tw-items-center tw-justify-center">
          <div className="tw-text-center tw-px-6">
            <div className="tw-mb-4">
              <div className="tw-inline-block">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="40" fill="url(#gradient)" />
                  <text
                    x="40"
                    y="50"
                    fontSize="30"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    AI
                  </text>
                  <circle cx="40" cy="25" r="8" fill="white" opacity="0.3" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="80" y2="80">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="tw-text-lg tw-font-semibold tw-mb-2 tw-text-gray-900">
              你好！我是AI智能助手
            </div>
            <div className="tw-text-sm tw-text-gray-500 tw-mb-4 tw-leading-relaxed">
              我可以帮助您了解系统功能、解答问题
            </div>
            <div className="tw-flex tw-flex-wrap tw-gap-2 tw-justify-center">
              {['系统功能', '数据分析', '企业看板'].map((tag, index) => (
                <div
                  key={index}
                  className="tw-px-3 tw-py-1.5 tw-bg-white tw-text-gray-600 tw-rounded-lg tw-text-xs tw-border tw-border-gray-200 hover:tw-border-gray-300 hover:tw-bg-gray-50 tw-transition-colors tw-cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <style>
            {`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              .tw-animate-fadeInUp {
                animation: fadeInUp 0.6s ease-out;
              }
              .tw-animate-float {
                animation: float 3s ease-in-out infinite;
              }
            `}
          </style>
        </div>
      ) : (
        <>
          {messages.map(message =>
            message.role === 'user' ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                isStreaming={streamingMessageId === message.id}
              />
            )
          )}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="tw-flex tw-items-start tw-gap-2 tw-mb-4">
              <div className="tw-w-8 tw-h-8 tw-bg-gradient-to-br tw-from-blue-500 tw-to-purple-600 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                <span className="tw-text-sm">🤖</span>
              </div>
              <div className="tw-bg-gray-50 tw-rounded-lg tw-px-4 tw-py-3">
                <div className="tw-flex tw-gap-1">
                  <span
                    className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;

