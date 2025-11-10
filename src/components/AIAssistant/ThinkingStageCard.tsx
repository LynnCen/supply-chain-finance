import { LoadingOutlined } from '@ant-design/icons';
import { STAGE_CONFIG } from './constants';
import type { ThinkingStage } from '@/types/aiAssistant';
import { useStreamingMessage } from './hooks/useStreamingMessage';

interface ThinkingStageCardProps {
  stage: ThinkingStage;
  isActive?: boolean;
  showStreaming?: boolean;
}

const ThinkingStageCard: React.FC<ThinkingStageCardProps> = ({
  stage,
  isActive = false,
  showStreaming = false,
}) => {
  const config = STAGE_CONFIG[stage.type];

  const { displayedContent, isStreaming } = useStreamingMessage({
    content: showStreaming ? stage.content : stage.content,
    speed: showStreaming ? 20 : 0,
  });

  const content = showStreaming ? displayedContent : stage.content;

  return (
    <div
      className={`tw-mb-3 tw-rounded-lg tw-overflow-hidden tw-transition-all tw-duration-300 tw-border ${config.accentColor} tw-bg-white ${
        isActive ? 'tw-shadow-md' : ''
      }`}
      style={{
        animation: isActive ? 'slideIn 0.3s ease-out' : 'none',
      }}
    >
      <div
        className={`tw-px-4 tw-py-2 tw-bg-gradient-to-r ${config.bgColor} tw-flex tw-items-center tw-gap-2 tw-border-b ${config.accentColor}`}
      >
        <div className="tw-text-base">{config.icon}</div>
        <span className={`tw-font-medium tw-text-xs ${config.textColor}`}>{config.title}</span>
        {isActive && stage.status === 'processing' && (
          <div className="tw-ml-auto">
            <LoadingOutlined className={`tw-text-xs ${config.textColor}`} spin />
          </div>
        )}
      </div>
      {stage.content && (
        <div className={`tw-px-4 tw-py-3 ${config.lightBg} tw-text-gray-700 tw-text-sm tw-leading-relaxed tw-whitespace-pre-wrap`}>
          {content}
          {showStreaming && isStreaming && (
            <span className="tw-inline-block tw-w-0.5 tw-h-4 tw-ml-1 tw-bg-gradient-to-b tw-from-purple-500 tw-to-blue-500 tw-animate-pulse tw-rounded-full" />
          )}
        </div>
      )}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ThinkingStageCard;

