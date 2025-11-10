import { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="tw-p-3 tw-border-t tw-border-gray-200 tw-bg-white">
      <div
        className={`tw-flex tw-gap-2 tw-p-2 tw-rounded-xl tw-border tw-transition-all tw-duration-200 tw-bg-white ${
          isFocused
            ? 'tw-border-purple-400 tw-shadow-sm'
            : 'tw-border-gray-200 hover:tw-border-gray-300'
        }`}
      >
        <TextArea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={disabled}
          className="tw-flex-1 tw-border-0 tw-outline-none tw-resize-none tw-text-sm tw-leading-relaxed tw-text-gray-900 tw-px-2 tw-py-1"
          style={{
            boxShadow: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        />
        <div className="tw-flex tw-items-end tw-pb-1">
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className="tw-h-8 tw-px-3 tw-rounded-lg tw-border-0 tw-text-sm tw-transition-all tw-duration-200"
            style={{
              background: disabled || !value.trim() 
                ? '#d1d5db' 
                : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

