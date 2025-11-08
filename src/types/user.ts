// 用户信息
export interface UserInfo {
  id: string;
  username: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  createTime: string;
  lastLoginTime: string;
}

// 用户登录请求
export interface LoginParams {
  username: string;
  password: string;
}

// 用户登录响应
export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}
