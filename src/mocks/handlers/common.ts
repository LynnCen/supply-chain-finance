import { http, HttpResponse } from 'msw';

export const commonHandlers = [
  // 示例：获取用户信息
  http.get('/api/user/info', () => {
    return HttpResponse.json({
      code: 0,
      data: {
        id: 1,
        name: '系统管理员',
        role: 'admin',
        avatar: '',
      },
      message: 'success',
    });
  }),
];
