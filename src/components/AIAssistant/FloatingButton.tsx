import { Badge } from 'antd';
import Logo from './Logo';

interface FloatingButtonProps {
  onClick: () => void;
  hasNewMessage?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, hasNewMessage = false }) => {
  return (
    <Badge dot={hasNewMessage} offset={[-8, 8]}>
      <div
        onClick={onClick}
        className="tw-fixed tw-bottom-4 tw-right-4 tw-w-14 tw-h-14 tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 hover:tw-scale-110 tw-z-50  hover:tw-shadow-xl"
        style={{
          zIndex: 1000,
        }}
      >
        <Logo size={56} />
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
          `}
        </style>
      </div>
    </Badge>
  );
};

export default FloatingButton;
