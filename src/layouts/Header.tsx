import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Badge, Avatar, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import { useRequest } from 'ahooks';
import { useGlobalStore } from '@/stores/useGlobalStore';
import { getUserInfo } from '@/api/user';
import type { UserInfo } from '@/types/user';

const Header = () => {
  const { collapsed, toggleCollapsed } = useGlobalStore();

  // 获取用户信息
  const { data: userInfoData, loading } = useRequest(getUserInfo, {
    onSuccess: data => {
      console.log('用户信息获取成功:', data);
    },
    onError: error => {
      console.error('用户信息获取失败:', error);
      message.error('获取用户信息失败');
    },
  });

  const userInfo = userInfoData?.data as UserInfo | undefined;

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人中心',
    },
    {
      key: 'settings',
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      danger: true,
    },
  ];

  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-h-16 tw-bg-white tw-border-b tw-border-gray-200">
      <div className="tw-flex tw-items-center tw-gap-4">
        <div
          className="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-lg tw-cursor-pointer tw-transition-all hover:tw-bg-blue-50 hover:tw-text-blue-600"
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="tw-text-lg" />
          ) : (
            <MenuFoldOutlined className="tw-text-lg" />
          )}
        </div>
        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-8 tw-h-8 tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
            <span className="tw-text-white tw-text-sm tw-font-bold">供</span>
          </div>
          <h1 className="tw-text-lg tw-font-semibold tw-text-gray-800">供应链金融管理系统</h1>
        </div>
      </div>
      <div className="tw-flex tw-items-center tw-gap-4">
        <Badge count={5} size="small">
          <div className="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-lg tw-cursor-pointer tw-transition-all hover:tw-bg-gray-100">
            <BellOutlined className="tw-text-lg tw-text-gray-600" />
          </div>
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-px-3 tw-py-2 tw-rounded-lg tw-transition-all hover:tw-bg-gray-100">
            {loading ? (
              <Avatar size="small" icon={<UserOutlined />} className="tw-bg-gray-400" />
            ) : userInfo?.avatar ? (
              <Avatar size="small" src={userInfo.avatar} />
            ) : (
              <Avatar size="small" icon={<UserOutlined />} className="tw-bg-blue-500" />
            )}
            <span className="tw-text-sm tw-text-gray-700 tw-font-medium">
              {loading ? '加载中...' : userInfo?.name || '未登录'}
            </span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
