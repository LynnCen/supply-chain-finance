import { StageType } from '@/types/aiAssistant';

// 阶段配置 - 优雅现代配色方案
export const STAGE_CONFIG: Record<
  StageType,
  {
    title: string;
    icon: string;
    color: string;
    bgColor: string;
    lightBg: string;
    textColor: string;
    accentColor: string;
  }
> = {
  thinking: {
    title: '思考中',
    icon: '💭',
    color: '#8b5cf6',
    bgColor: 'tw-from-purple-50 tw-to-violet-50',
    lightBg: 'tw-bg-gradient-to-br tw-from-purple-50/50 tw-to-white',
    textColor: 'tw-text-purple-600',
    accentColor: 'tw-border-purple-200',
  },
  analyzing: {
    title: '分析中',
    icon: '🔍',
    color: '#3b82f6',
    bgColor: 'tw-from-blue-50 tw-to-indigo-50',
    lightBg: 'tw-bg-gradient-to-br tw-from-blue-50/50 tw-to-white',
    textColor: 'tw-text-blue-600',
    accentColor: 'tw-border-blue-200',
  },
  planning: {
    title: '规划中',
    icon: '📝',
    color: '#06b6d4',
    bgColor: 'tw-from-cyan-50 tw-to-sky-50',
    lightBg: 'tw-bg-gradient-to-br tw-from-cyan-50/50 tw-to-white',
    textColor: 'tw-text-cyan-600',
    accentColor: 'tw-border-cyan-200',
  },
  executing: {
    title: '执行中',
    icon: '⚡',
    color: '#10b981',
    bgColor: 'tw-from-emerald-50 tw-to-teal-50',
    lightBg: 'tw-bg-gradient-to-br tw-from-emerald-50/50 tw-to-white',
    textColor: 'tw-text-emerald-600',
    accentColor: 'tw-border-emerald-200',
  },
  completed: {
    title: '已完成',
    icon: '✨',
    color: '#8b5cf6',
    bgColor: 'tw-from-violet-50 tw-to-purple-50',
    lightBg: 'tw-bg-gradient-to-br tw-from-violet-50/50 tw-to-white',
    textColor: 'tw-text-violet-600',
    accentColor: 'tw-border-violet-200',
  },
};

// 动画配置
export const ANIMATION_DURATION = {
  TYPING_SPEED: 30, // 打字速度（毫秒/字符）
  STAGE_TRANSITION: 500, // 阶段转换时间
  WINDOW_TOGGLE: 300, // 窗口展开/收起时间
};

// 窗口尺寸 - 撑满半个屏幕
export const CHAT_WINDOW = {
  WIDTH: 600,
  HEIGHT: 'calc(70vh - 32px)', // 半屏高度，减去bottom的16px
  MIN_HEIGHT: 500,
  MAX_HEIGHT: '50vh',
};
