import { Card, List, Tag, Skeleton } from 'antd';
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  MinusOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import type { EnterpriseRankingItem } from '@/types/enterpriseDashboard';

interface RankingBoardProps {
  data?: EnterpriseRankingItem[];
  loading?: boolean;
  currentEnterpriseId?: string;
}

/**
 * 企业排行榜组件
 * 展示Top 10企业排名
 */
const RankingBoard: React.FC<RankingBoardProps> = ({
  data = [],
  loading = false,
  currentEnterpriseId,
}) => {
  // 获取排名图标
  const getRankIcon = (rank: number) => {
    const iconStyle = 'tw-text-xl';
    if (rank === 1) {
      return <CrownOutlined className={`${iconStyle} tw-text-yellow-500`} />;
    }
    if (rank === 2) {
      return <CrownOutlined className={`${iconStyle} tw-text-gray-400`} />;
    }
    if (rank === 3) {
      return <CrownOutlined className={`${iconStyle} tw-text-orange-400`} />;
    }
    return <span className="tw-font-bold tw-text-gray-600">{rank}</span>;
  };

  // 获取趋势图标
  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'up') {
      return (
        <Tag color="success" icon={<RiseOutlined />}>
          +{value}
        </Tag>
      );
    }
    if (trend === 'down') {
      return (
        <Tag color="error" icon={<FallOutlined />}>
          {value}
        </Tag>
      );
    }
    return (
      <Tag color="default" icon={<MinusOutlined />}>
        -
      </Tag>
    );
  };

  if (loading) {
    return (
      <Card
        className="tw-border tw-border-gray-200 tw-shadow-sm"
        title={
          <div className="tw-flex tw-items-center">
            <TrophyOutlined className="tw-mr-2 tw-text-yellow-500" />
            <span>企业热榜 TOP 10</span>
          </div>
        }
      >
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>
    );
  }

  return (
    <Card
      className="tw-border tw-border-yellow-100 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-bg-gradient-to-br tw-from-white tw-to-yellow-50/20 tw-h-full tw-flex tw-flex-col"
      bodyStyle={{ padding: '0', flex: 1, overflow: 'hidden' }}
      title={
        <div className="tw-flex tw-items-center">
          <TrophyOutlined className="tw-mr-2 tw-text-yellow-500" />
          <span>企业热榜 TOP 10</span>
        </div>
      }
    >
      <div
        className="tw-h-full tw-overflow-y-auto tw-pt-3 scrollbar-thin"
        style={{ maxHeight: '460px' }}
      >
        <List
          dataSource={data}
          split={true}
          renderItem={item => (
            <List.Item
              className={` hover:tw-bg-gray-50 tw-transition-colors tw-border-b tw-border-gray-100 last:tw-border-0 ${
                item.enterpriseId === currentEnterpriseId ? 'tw-bg-blue-50' : ''
              }`}
            >
              <div className="tw-px-4 tw-flex tw-items-center tw-w-full tw-gap-3">
                {/* 排名 */}
                <div className="tw-w-8 tw-flex tw-items-center tw-justify-center">
                  {getRankIcon(item.rank)}
                </div>

                {/* 企业信息 */}
                <div className="tw-flex-1 tw-min-w-0">
                  <div className="tw-font-semibold tw-text-sm tw-text-gray-900 tw-truncate">
                    {item.enterpriseName}
                  </div>
                  <div className="tw-text-xs tw-text-gray-500 tw-mt-0.5">
                    交易额：{(item.transactionAmount / 100000000).toFixed(2)} 亿
                  </div>
                </div>

                {/* 评分和趋势 */}
                <div className="tw-flex tw-flex-col tw-items-end tw-gap-1">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span className="tw-text-sm tw-font-bold tw-text-blue-600">
                      {item.comprehensiveScore.toFixed(1)}
                    </span>
                    <Tag color="blue" className="tw-m-0 tw-text-xs">
                      {item.creditRating}
                    </Tag>
                  </div>
                  <div>{getTrendIcon(item.trend, item.trendValue)}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default RankingBoard;
