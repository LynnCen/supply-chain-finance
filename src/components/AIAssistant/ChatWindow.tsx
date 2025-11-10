import { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChat } from './hooks/useChat';
import { CHAT_WINDOW } from './constants';

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, isMinimized, onClose, onMinimize }) => {
  const { messages, isLoading, streamingMessageId, messagesEndRef, handleSendMessage } = useChat();

  useEffect(() => {
    // 当窗口打开时，可以添加欢迎消息等逻辑
    if (isOpen && messages.length === 0) {
      // 可选：添加欢迎消息
    }
  }, [isOpen, messages.length]);

  if (!isOpen) return null;

  return (
    <div
      className={`tw-fixed tw-bottom-4 tw-right-4 tw-bg-white tw-rounded-2xl tw-shadow-xl tw-transition-all tw-duration-300 tw-z-50 tw-flex tw-flex-col tw-overflow-hidden tw-border tw-border-gray-200 ${
        isMinimized ? 'tw-h-auto' : ''
      }`}
      style={{
        width: CHAT_WINDOW.WIDTH,
        height: isMinimized ? 'auto' : CHAT_WINDOW.HEIGHT,
        // maxHeight: CHAT_WINDOW.MAX_HEIGHT,
        zIndex: 999,
      }}
    >
      <ChatHeader onClose={onClose} onMinimize={onMinimize} />

      {!isMinimized && (
        <>
          <MessageList
            messages={messages}
            isLoading={isLoading}
            streamingMessageId={streamingMessageId}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </>
      )}
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatWindow;
