import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '@/router/routes';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = routes.map(route => ({
    key: route.path,
    icon: <route.icon />,
    label: route.name,
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div className="tw-h-full tw-py-4">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="tw-border-r-0"
        style={{
          background: 'transparent',
        }}
      />
    </div>
  );
};

export default Sidebar;
