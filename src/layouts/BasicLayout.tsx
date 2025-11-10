import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AIAssistant from '@/components/AIAssistant';
import { useGlobalStore } from '@/stores/useGlobalStore';

const { Header: AntHeader, Sider, Content } = Layout;

const BasicLayout = () => {
  const { collapsed } = useGlobalStore();

  return (
    <Layout className="tw-h-screen tw-bg-gray-50">
      <AntHeader className="tw-p-0 tw-bg-white tw-shadow-sm tw-z-10">
        <Header />
      </AntHeader>
      <Layout className="tw-bg-gray-50">
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={220}
          className="tw-bg-white tw-border-r tw-border-gray-200"
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            position: 'sticky',
            top: 64,
            left: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout className="tw-bg-gray-50">
          <Content className="tw-m-6">
            <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6 tw-min-h-[calc(100vh-112px)]">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <AIAssistant />
    </Layout>
  );
};

export default BasicLayout;
