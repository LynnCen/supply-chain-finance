import type { DataManagementType } from '@/types/dataManagement';
import type { ReactNode } from 'react';

// Tab项配置
export interface TabItem {
  key: DataManagementType;
  label: string;
  count: number;
  icon?: ReactNode;
}

// 统计卡片配置
export interface StatisticCard {
  key: string;
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
  bgColor: string;
  growth?: number; // 增长率（百分比）
  trend?: 'up' | 'down'; // 趋势
}

// 表格工具栏状态
export interface TableToolbarState {
  keyword: string;
  loading: boolean;
}

// 数据管理页面状态
export interface DataManagementState {
  activeTab: DataManagementType;
  refreshTrigger: number; // 用于触发刷新
}

