import { commonHandlers } from './common';
import { userHandlers } from './user';

// 汇总所有Mock Handler
export const handlers = [...commonHandlers, ...userHandlers];
