import { useMemo } from 'react';
import ThinkingStageCard from './ThinkingStageCard';
import Logo from './Logo';
import type { ChatMessage } from '@/types/aiAssistant';

interface AssistantMessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ message, isStreaming = false }) => {
  const timestamp = useMemo(
    () =>
      new Date(message.timestamp).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [message.timestamp]
  );

  return (
    <div className="tw-mb-4 tw-animate-slideIn">
      <div className="tw-flex tw-items-start tw-gap-2.5 tw-mb-2">
        <Logo size={32} />
        <div className="tw-flex-1">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
            <span className="tw-text-sm tw-font-medium tw-text-gray-900">
              AI助手
            </span>
            <span className="tw-text-xs tw-text-gray-400">{timestamp}</span>
          </div>
          {message.stages && message.stages.length > 0 ? (
            <div>
              {message.stages.map((stage, index) => (
                <ThinkingStageCard
                  key={stage.id}
                  stage={stage}
                  isActive={isStreaming && index === message.stages!.length - 1}
                  showStreaming={isStreaming && index === message.stages!.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="tw-bg-white tw-rounded-xl tw-px-4 tw-py-3 tw-text-sm tw-text-gray-700 tw-leading-relaxed tw-border tw-border-gray-200">
              {message.content}
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .tw-animate-slideIn {
            animation: slideIn 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default AssistantMessage;

