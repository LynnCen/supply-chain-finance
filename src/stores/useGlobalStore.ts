import { create } from 'zustand';

interface GlobalState {
  collapsed: boolean;
  toggleCollapsed: () => void;

  // AI助手状态
  aiAssistantOpen: boolean;
  aiAssistantMinimized: boolean;
  openAIAssistant: () => void;
  closeAIAssistant: () => void;
  toggleAIAssistant: () => void;
  minimizeAIAssistant: () => void;
  maximizeAIAssistant: () => void;
}

export const useGlobalStore = create<GlobalState>(set => ({
  collapsed: false,
  toggleCollapsed: () => set(state => ({ collapsed: !state.collapsed })),

  // AI助手初始状态
  aiAssistantOpen: false,
  aiAssistantMinimized: false,

  openAIAssistant: () => set({ aiAssistantOpen: true, aiAssistantMinimized: false }),
  closeAIAssistant: () => set({ aiAssistantOpen: false }),
  toggleAIAssistant: () =>
    set(state => ({
      aiAssistantOpen: !state.aiAssistantOpen,
      aiAssistantMinimized: false,
    })),
  minimizeAIAssistant: () => set({ aiAssistantMinimized: true }),
  maximizeAIAssistant: () => set({ aiAssistantMinimized: false }),
}));
