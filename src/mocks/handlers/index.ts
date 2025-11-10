import { commonHandlers } from './common';
import { userHandlers } from './user';
import { dataManagementHandlers } from './dataManagement';

// 汇总所有Mock Handler
export const handlers = [...commonHandlers, ...userHandlers, ...dataManagementHandlers];
