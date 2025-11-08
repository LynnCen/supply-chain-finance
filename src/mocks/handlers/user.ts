import { http, HttpResponse } from 'msw';
import userData from '../data/user.json';

export const userHandlers = [
  // 获取用户信息
  http.get('/api/user/info', () => {
    return HttpResponse.json({
      code: 0,
      data: userData.userInfo,
      message: 'success',
    });
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
