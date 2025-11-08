import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 配置MSW Worker
export const worker = setupWorker(...handlers);
