import request from '@/utils/request';
import type { UserInfo, LoginParams, LoginResult } from '@/types/user';

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get<UserInfo>('/user/info');
}

/**
 * 用户登录
 */
export function login(data: LoginParams) {
  return request.post<LoginResult>('/user/login', data);
}

/**
 * 用户登出
 */
export function logout() {
  return request.post<null>('/user/logout');
}
