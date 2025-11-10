import { Card, Skeleton, Row, Col } from 'antd';
import {
  DatabaseOutlined,
  TransactionOutlined,
  BankOutlined,
  ShopOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { DataStatistics } from '@/types/dataManagement';

interface StatisticsCardsProps {
  statistics?: DataStatistics;
  loading?: boolean;
}

interface StatisticCardConfig {
  key: keyof DataStatistics;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const cardConfigs: StatisticCardConfig[] = [
  {
    key: 'transactionCount',
    title: '交易数据',
    icon: <TransactionOutlined />,
    color: 'tw-text-blue-500',
    bgColor: 'tw-bg-blue-50',
  },
  {
    key: 'loanCount',
    title: '贷款数据',
    icon: <BankOutlined />,
    color: 'tw-text-green-500',
    bgColor: 'tw-bg-green-50',
  },
  {
    key: 'enterpriseCount',
    title: '企业信息',
    icon: <ShopOutlined />,
    color: 'tw-text-orange-500',
    bgColor: 'tw-bg-orange-50',
  },
  {
    key: 'financialCount',
    title: '财务报表',
    icon: <FileTextOutlined />,
    color: 'tw-text-purple-500',
    bgColor: 'tw-bg-purple-50',
  },
  {
    key: 'totalCount',
    title: '总数据量',
    icon: <DatabaseOutlined />,
    color: 'tw-text-gray-700',
    bgColor: 'tw-bg-gray-100',
  },
];

/**
 * 统计卡片组件
 * 展示各类数据的统计信息
 */
const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics, loading = false }) => {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {cardConfigs.map(config => (
          <Col key={config.key} xs={24} sm={12} md={8} lg={8} xl={4.8}>
            <Card className="tw-border tw-border-gray-200">
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {cardConfigs.map(config => {
        const value = statistics?.[config.key] || 0;
        return (
          <Col key={config.key} xs={24} sm={12} md={8} lg={8} xl={4.8}>
            <Card
              className="tw-border tw-border-gray-200 hover:tw-shadow-md tw-transition-all tw-duration-200 tw-cursor-pointer"
              bodyStyle={{ padding: '20px' }}
            >
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex-1">
                  <p className="tw-text-sm tw-text-gray-600 tw-mb-2">{config.title}</p>
                  <p className="tw-text-2xl tw-font-bold tw-text-gray-900">
                    {value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`tw-w-12 tw-h-12 ${config.bgColor} tw-rounded-lg tw-flex tw-items-center tw-justify-center`}
                >
                  <span className={`tw-text-2xl ${config.color}`}>{config.icon}</span>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default StatisticsCards;
