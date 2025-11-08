import { Card, Empty, Progress } from 'antd';
import { AccountBookOutlined } from '@ant-design/icons';

const FinanceManagement = () => {
  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">财务管理</h1>
          <p className="tw-mt-1 tw-text-sm tw-text-gray-500">管理还款计划、财务分析和资金流水</p>
        </div>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
        <Card
          title="还款进度"
          className="tw-border tw-border-gray-200"
          extra={<AccountBookOutlined />}
        >
          <div className="tw-space-y-4">
            <div>
              <div className="tw-flex tw-justify-between tw-mb-2">
                <span className="tw-text-sm tw-text-gray-600">本月还款</span>
                <span className="tw-text-sm tw-font-medium">0%</span>
              </div>
              <Progress percent={0} strokeColor="#52c41a" />
            </div>
            <div>
              <div className="tw-flex tw-justify-between tw-mb-2">
                <span className="tw-text-sm tw-text-gray-600">年度还款</span>
                <span className="tw-text-sm tw-font-medium">0%</span>
              </div>
              <Progress percent={0} strokeColor="#1677ff" />
            </div>
          </div>
        </Card>

        <Card
          title="资金概览"
          className="tw-border tw-border-gray-200"
          extra={<AccountBookOutlined />}
        >
          <div className="tw-space-y-3">
            <div className="tw-flex tw-justify-between tw-py-2 tw-border-b tw-border-gray-100">
              <span className="tw-text-gray-600">总贷款金额</span>
              <span className="tw-font-medium">¥ 0.00</span>
            </div>
            <div className="tw-flex tw-justify-between tw-py-2 tw-border-b tw-border-gray-100">
              <span className="tw-text-gray-600">已还金额</span>
              <span className="tw-font-medium tw-text-green-600">¥ 0.00</span>
            </div>
            <div className="tw-flex tw-justify-between tw-py-2">
              <span className="tw-text-gray-600">待还金额</span>
              <span className="tw-font-medium tw-text-red-600">¥ 0.00</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="tw-border tw-border-gray-200">
        <Empty
          description={
            <span className="tw-text-gray-500">
              财务管理模块内容待填充，您可以在这里添加财务报表、流水明细等组件
            </span>
          }
        />
      </Card>
    </div>
  );
};

export default FinanceManagement;
