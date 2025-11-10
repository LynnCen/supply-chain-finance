import { useState, useMemo } from 'react';
import { Row, Col, Empty, Spin, Badge } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { SyncOutlined } from '@ant-design/icons';
import { TimeRange } from '@/types/enterpriseDashboard';
import EnterpriseSelector from './components/EnterpriseSelector';
import TimeRangeFilter from './components/TimeRangeFilter';
import BasicInfoCard from './components/BasicInfoCard';
import RankingBoard from './components/RankingBoard';
import FinancialHealthRadar from './components/FinancialHealthRadar';
import TransactionTrendChart from './components/TransactionTrendChart';
import OrderStatisticsChart from './components/OrderStatisticsChart';
import PartnerTable from './components/PartnerTable';
import { useEnterpriseDashboard } from './hooks/useEnterpriseDashboard';

/**
 * 企业看板主页面
 * 供应链金融场景下的企业详情展示
 */
const EnterpriseDashboard = () => {
  // 页面状态
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>();
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.MONTH);

  // 使用业务逻辑Hook获取所有数据
  const {
    enterpriseList,
    enterpriseListLoading,
    basicInfo,
    basicInfoLoading,
    financialHealth,
    financialHealthLoading,
    transactionTrend,
    transactionTrendLoading,
    orderStatistics,
    orderStatisticsLoading,
    partners,
    partnersLoading,
    ranking,
    rankingLoading,
  } = useEnterpriseDashboard(selectedEnterpriseId, timeRange);

  // 默认选择第一个企业
  useMemo(() => {
    if (!selectedEnterpriseId && enterpriseList.length > 0) {
      setSelectedEnterpriseId(enterpriseList[0].id);
    }
  }, [enterpriseList, selectedEnterpriseId]);

  // 企业切换处理
  const handleEnterpriseChange = useMemoizedFn((value: string) => {
    setSelectedEnterpriseId(value);
  });

  // 时间范围切换处理
  const handleTimeRangeChange = useMemoizedFn((value: TimeRange) => {
    setTimeRange(value);
  });

  // 空状态展示
  if (!enterpriseListLoading && enterpriseList.length === 0) {
    return (
      <div className="tw-space-y-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div>
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">企业看板</h1>
            <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
              实时监控企业信用评分、财务健康和供应链风险指标
            </p>
          </div>
        </div>
        <Empty
          description="暂无企业数据，请先在数据管理模块上传企业信息"
          className="tw-py-20"
        />
      </div>
    );
  }

  return (
    <div className="tw-space-y-4">
      {/* 页面标题 */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-1">企业看板</h1>
          <p className="tw-text-sm tw-text-gray-500">实时监控企业财务健康和供应链风险</p>
        </div>
      </div>

      {/* 筛选器区域 */}
      <div className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-purple-50 tw-rounded-xl tw-p-4 tw-shadow-sm tw-border tw-border-blue-100 tw-relative">
        {/* 数据加载指示器 */}
        {(basicInfoLoading || financialHealthLoading || transactionTrendLoading || orderStatisticsLoading) && (
          <div className="tw-absolute tw-top-2 tw-right-2">
            <Badge 
              status="processing" 
              text={
                <span className="tw-text-xs tw-text-blue-600 tw-flex tw-items-center tw-gap-1">
                  <SyncOutlined spin />
                  数据更新中...
                </span>
              } 
            />
          </div>
        )}
        
        <div className="tw-flex tw-items-center tw-justify-between tw-gap-6">
          {/* 左侧：企业选择器 */}
          <div className="tw-flex-1 tw-max-w-md">
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
              选择企业
            </label>
            <EnterpriseSelector
              value={selectedEnterpriseId}
              onChange={handleEnterpriseChange}
              enterprises={enterpriseList}
              loading={enterpriseListLoading}
            />
          </div>

          {/* 右侧：时间范围筛选器 */}
          <div>
            <TimeRangeFilter value={timeRange} onChange={handleTimeRangeChange} />
          </div>
        </div>
      </div>

      {/* 主内容区 - 紧凑布局 */}
      {selectedEnterpriseId ? (
        <div className="tw-space-y-3 tw-transition-opacity tw-duration-300" style={{ 
          opacity: (basicInfoLoading || financialHealthLoading || transactionTrendLoading || orderStatisticsLoading) ? 0.6 : 1 
        }}>
          {/* 第一行：企业基本信息 + 企业排行榜 */}
          <Row gutter={[12, 12]} className="tw-items-stretch">
            <Col xs={24} lg={12} className="tw-flex">
              <div className="tw-w-full">
                <BasicInfoCard data={basicInfo} loading={basicInfoLoading} />
              </div>
            </Col>
            <Col xs={24} lg={12} className="tw-flex">
              <div className="tw-w-full">
                <RankingBoard
                  data={ranking}
                  loading={rankingLoading}
                  currentEnterpriseId={selectedEnterpriseId}
                />
              </div>
            </Col>
          </Row>

          {/* 第二行：财务健康 + 交易趋势 */}
          <Row gutter={[12, 12]} className="tw-items-stretch">
            <Col xs={24} xl={12} className="tw-flex">
              <div className="tw-w-full">
                <FinancialHealthRadar data={financialHealth} loading={financialHealthLoading} />
              </div>
            </Col>
            <Col xs={24} xl={12} className="tw-flex">
              <div className="tw-w-full">
                <TransactionTrendChart data={transactionTrend} loading={transactionTrendLoading} />
              </div>
            </Col>
          </Row>

          {/* 第三行：订单统计 */}
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <OrderStatisticsChart data={orderStatistics} loading={orderStatisticsLoading} />
            </Col>
          </Row>

          {/* 第四行：合作伙伴表格 */}
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <PartnerTable data={partners} loading={partnersLoading} />
            </Col>
          </Row>
        </div>
      ) : (
        <div className="tw-flex tw-items-center tw-justify-center tw-py-20">
          <Spin size="large" tip="加载中..." />
        </div>
      )}
    </div>
  );
};

export default EnterpriseDashboard;
