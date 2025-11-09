import request from '@/utils/request';
import type { ApiResponse } from '@/types/common';
import type { UserInfo, LoginParams, LoginResult } from '@/types/user';

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get<ApiResponse<UserInfo>>('/user/info');
}

/**
 * 用户登录
 */
export function login(data: LoginParams) {
  return request.post<ApiResponse<LoginResult>>('/user/login', data);
}

/**
 * 用户登出
 */
export function logout() {
  return request.post<ApiResponse<null>>('/user/logout');
}
