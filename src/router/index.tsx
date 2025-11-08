import { lazy, Suspense, ComponentType } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import { routes } from './routes';

// 懒加载包装组件
function lazyLoadComponent(
  importFunc: () => Promise<{ default: ComponentType }>
): React.ReactElement {
  const Component = lazy(importFunc);
  return (
    <Suspense
      fallback={
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/data-management" replace />,
      },
      ...routes.map(route => ({
        path: route.path,
        element: lazyLoadComponent(route.component),
      })),
    ],
  },
]);
