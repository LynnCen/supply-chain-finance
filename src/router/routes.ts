import {
  DatabaseOutlined,
  DashboardOutlined,
  FileTextOutlined,
  AccountBookOutlined,
  MessageOutlined,
} from '@ant-design/icons';

import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  name: string;
  icon: ComponentType;
  component: () => Promise<{ default: ComponentType }>;
}

export const routes: RouteConfig[] = [
  {
    path: '/data-management',
    name: '数据管理',
    icon: DatabaseOutlined,
    component: () => import('@/pages/DataManagement'),
  },
  {
    path: '/enterprise-dashboard',
    name: '企业看板',
    icon: DashboardOutlined,
    component: () => import('@/pages/EnterpriseDashboard'),
  },
  {
    path: '/analysis-report',
    name: '分析报告',
    icon: FileTextOutlined,
    component: () => import('@/pages/AnalysisReport'),
  },
  {
    path: '/finance-management',
    name: '财务管理',
    icon: AccountBookOutlined,
    component: () => import('@/pages/FinanceManagement'),
  },
  {
    path: '/messages',
    name: '消息',
    icon: MessageOutlined,
    component: () => import('@/pages/Messages'),
  },
];
