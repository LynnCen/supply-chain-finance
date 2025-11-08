import { create } from 'zustand';

interface GlobalState {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export const useGlobalStore = create<GlobalState>(set => ({
  collapsed: false,
  toggleCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
}));
