import type { ChatMessage } from '@/types/aiAssistant';

interface UserMessageProps {
  message: ChatMessage;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="tw-flex tw-justify-end tw-mb-4 tw-animate-fadeIn">
      <div className="tw-max-w-[80%] tw-bg-gradient-to-br tw-from-purple-500 tw-to-blue-500 tw-text-white tw-rounded-2xl tw-rounded-tr-sm tw-px-4 tw-py-3 tw-shadow-md">
        <div className="tw-text-sm tw-leading-relaxed tw-whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="tw-text-xs tw-opacity-80 tw-mt-1.5 tw-text-right">
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .tw-animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default UserMessage;

