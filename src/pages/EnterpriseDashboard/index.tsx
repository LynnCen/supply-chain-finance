import { Card, Empty, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const EnterpriseDashboard = () => {
  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">企业看板</h1>
          <p className="tw-mt-1 tw-text-sm tw-text-gray-500">实时监控企业信用评分和风险指标</p>
        </div>
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false} className="tw-border tw-border-gray-200">
            <Statistic
              title="平均信用评分"
              value={0}
              suffix="/ 100"
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="tw-border tw-border-gray-200">
            <Statistic
              title="风险预警"
              value={0}
              suffix="项"
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="tw-border tw-border-gray-200">
            <Statistic title="监控企业数" value={0} suffix="家" />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="tw-border tw-border-gray-200">
            <Statistic title="本月新增" value={0} suffix="家" />
          </Card>
        </Col>
      </Row>

      <Card className="tw-border tw-border-gray-200">
        <Empty
          description={
            <span className="tw-text-gray-500">
              企业看板模块内容待填充，您可以在这里添加图表、趋势分析等组件
            </span>
          }
        />
      </Card>
    </div>
  );
};

export default EnterpriseDashboard;
