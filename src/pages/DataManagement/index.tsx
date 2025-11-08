import { Card, Empty } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

const DataManagement = () => {
  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">数据管理</h1>
          <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
            管理交易记录、贷款记录等核心业务数据
          </p>
        </div>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        <Card className="tw-border tw-border-gray-200 hover:tw-shadow-md tw-transition-shadow">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div>
              <p className="tw-text-sm tw-text-gray-600">交易记录</p>
              <p className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mt-2">0</p>
            </div>
            <div className="tw-w-12 tw-h-12 tw-bg-blue-50 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
              <DatabaseOutlined className="tw-text-2xl tw-text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="tw-border tw-border-gray-200 hover:tw-shadow-md tw-transition-shadow">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div>
              <p className="tw-text-sm tw-text-gray-600">贷款记录</p>
              <p className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mt-2">0</p>
            </div>
            <div className="tw-w-12 tw-h-12 tw-bg-green-50 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
              <DatabaseOutlined className="tw-text-2xl tw-text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="tw-border tw-border-gray-200 hover:tw-shadow-md tw-transition-shadow">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div>
              <p className="tw-text-sm tw-text-gray-600">总数据量</p>
              <p className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mt-2">0</p>
            </div>
            <div className="tw-w-12 tw-h-12 tw-bg-purple-50 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
              <DatabaseOutlined className="tw-text-2xl tw-text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="tw-border tw-border-gray-200">
        <Empty
          description={
            <span className="tw-text-gray-500">
              数据管理模块内容待填充，您可以在这里添加数据表格、筛选器等组件
            </span>
          }
        />
      </Card>
    </div>
  );
};

export default DataManagement;
