import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ENABLE_MOCK } from './config';

// 在开发环境且开启Mock时启动MSW
async function enableMocking() {
  if (import.meta.env.DEV && ENABLE_MOCK) {
    const { worker } = await import('./mocks/browser');
    return worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
