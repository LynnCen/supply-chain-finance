import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import Logo from './Logo';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onMinimize }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-bg-white tw-border-b tw-border-gray-100">
      <div className="tw-flex tw-items-center tw-gap-3">
        <Logo size={36} />
        <div>
          <div className="tw-font-semibold tw-text-sm tw-text-gray-900">AI智能助手</div>
          <div className="tw-text-xs tw-text-gray-500 tw-flex tw-items-center tw-gap-1">
            <span className="tw-w-1.5 tw-h-1.5 tw-bg-green-500 tw-rounded-full"></span>
            在线
          </div>
        </div>
      </div>
      <div className="tw-flex tw-items-center tw-gap-1">
        <div
          onClick={onMinimize}
          className="tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-transition-colors tw-duration-200 hover:tw-bg-gray-100 tw-text-gray-500 hover:tw-text-gray-700"
        >
          <MinusOutlined className="tw-text-sm" />
        </div>
        <div
          onClick={onClose}
          className="tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-transition-colors tw-duration-200 hover:tw-bg-gray-100 tw-text-gray-500 hover:tw-text-gray-700"
        >
          <CloseOutlined className="tw-text-sm" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

