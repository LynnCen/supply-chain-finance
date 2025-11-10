import { useGlobalStore } from '@/stores/useGlobalStore';
import FloatingButton from './FloatingButton';
import ChatWindow from './ChatWindow';

const AIAssistant: React.FC = () => {
  const {
    aiAssistantOpen,
    aiAssistantMinimized,
    toggleAIAssistant,
    closeAIAssistant,
    minimizeAIAssistant,
    maximizeAIAssistant,
  } = useGlobalStore();

  const handleButtonClick = () => {
    if (aiAssistantOpen && aiAssistantMinimized) {
      maximizeAIAssistant();
    } else {
      toggleAIAssistant();
    }
  };

  return (
    <>
      {(!aiAssistantOpen || aiAssistantMinimized) && (
        <FloatingButton onClick={handleButtonClick} />
      )}
      <ChatWindow
        isOpen={aiAssistantOpen}
        isMinimized={aiAssistantMinimized}
        onClose={closeAIAssistant}
        onMinimize={minimizeAIAssistant}
      />
    </>
  );
};

export default AIAssistant;

