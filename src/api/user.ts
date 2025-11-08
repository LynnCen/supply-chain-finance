import request from '@/utils/request';
import type { ApiResponse } from '@/types/common';
import type { UserInfo, LoginParams, LoginResult } from '@/types/user';
import type { ApiConfig } from '@/hooks/useQuery';

/**
 * 获取用户信息
 */
export const getUserInfo: ApiConfig<ApiResponse<UserInfo>, []> = {
  service: () => request.get<ApiResponse<UserInfo>>('/user/info'),
  mockData: {
    code: 0,
    data: {
      id: '1001',
      username: 'admin',
      name: '系统管理员',
      avatar: '',
      email: 'admin@supply-chain.com',
      phone: '13800138000',
      role: 'admin',
      department: '技术部',
      createTime: '2024-01-01 10:00:00',
      lastLoginTime: '2025-11-08 16:30:00',
    },
    message: 'success',
  },
};

/**
 * 用户登录
 */
export const login: ApiConfig<ApiResponse<LoginResult>, [LoginParams]> = {
  service: (data: LoginParams) => request.post<ApiResponse<LoginResult>>('/user/login', data),
  mockData: (data: LoginParams) => {
    // 模拟登录验证逻辑
    if (data.username === 'admin' && data.password === '123456') {
      return {
        code: 0,
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: getUserInfo.mockData!.data,
        },
        message: '登录成功',
      };
    }
    return {
      code: 1001,
      data: {} as LoginResult,
      message: '用户名或密码错误',
    };
  },
};

/**
 * 用户登出
 */
export const logout: ApiConfig<ApiResponse<null>, []> = {
  service: () => request.post<ApiResponse<null>>('/user/logout'),
  mockData: {
    code: 0,
    data: null,
    message: '退出成功',
  },
};
