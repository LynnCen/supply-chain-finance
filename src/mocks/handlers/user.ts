import { http, HttpResponse } from 'msw';
import userData from '../data/user.json';
import type { LoginParams } from '@/types/user';

export const userHandlers = [
  // 获取用户信息
  http.get('/api/user/info', () => {
    return HttpResponse.json({
      code: 0,
      data: userData.userInfo,
      message: 'success',
    });
  }),

  // 用户登录
  http.post('/api/user/login', async ({ request }) => {
    const data = (await request.json()) as LoginParams;

    // 模拟登录验证逻辑
    if (data.username === 'admin' && data.password === '123456') {
      return HttpResponse.json({
        code: 0,
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: userData.userInfo,
        },
        message: '登录成功',
      });
    }

    return HttpResponse.json(
      {
        code: 1001,
        data: null,
        message: '用户名或密码错误',
      },
      { status: 401 }
    );
  }),

  // 用户登出
  http.post('/api/user/logout', () => {
    return HttpResponse.json({
      code: 0,
      data: null,
      message: '退出成功',
    });
  }),
];
