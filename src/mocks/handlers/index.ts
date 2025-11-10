import { commonHandlers } from './common';
import { userHandlers } from './user';
import { dataManagementHandlers } from './dataManagement';
import { enterpriseDashboardHandlers } from './enterpriseDashboard';
import { aiAssistantHandlers } from './aiAssistant';
import { analysisReportHandlers } from './analysisReport';

// 汇总所有Mock Handler
export const handlers = [
  ...commonHandlers,
  ...userHandlers,
  ...dataManagementHandlers,
  ...enterpriseDashboardHandlers,
  ...aiAssistantHandlers,
  ...analysisReportHandlers,
];
