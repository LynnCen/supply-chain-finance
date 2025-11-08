import { Card, Empty, Tabs } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const AnalysisReport = () => {
  const tabItems = [
    {
      key: 'credit',
      label: '信用报告',
      children: (
        <Empty description={<span className="tw-text-gray-500">信用报告内容待填充</span>} />
      ),
    },
    {
      key: 'supply-chain',
      label: '供应链分析',
      children: (
        <Empty description={<span className="tw-text-gray-500">供应链分析内容待填充</span>} />
      ),
    },
    {
      key: 'risk',
      label: '风险评估',
      children: (
        <Empty description={<span className="tw-text-gray-500">风险评估内容待填充</span>} />
      ),
    },
  ];

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">分析报告</h1>
          <p className="tw-mt-1 tw-text-sm tw-text-gray-500">查看和生成各类业务分析报告</p>
        </div>
        <div className="tw-flex tw-items-center tw-gap-2 tw-text-blue-600">
          <FileTextOutlined className="tw-text-2xl" />
        </div>
      </div>

      <Card className="tw-border tw-border-gray-200">
        <Tabs items={tabItems} />
      </Card>
    </div>
  );
};

export default AnalysisReport;
