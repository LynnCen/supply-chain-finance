/**
 * 分析报告主页面
 * 供应链金融企业信用与风险分析报告
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Spin, Segmented, Select, Button, Badge } from 'antd';
import {
  FileTextOutlined,
  DownloadOutlined,
  PrinterOutlined,
  SyncOutlined,
  CalendarOutlined,
  BankOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useMemoizedFn, useRequest } from 'ahooks';
import { TimeRange, TIME_RANGE_LABELS } from '@/types/analysisReport';
import {
  getEnterpriseList,
  getCreditScore,
  getRiskAnalysis,
  getSupplyChainCashFlow,
  getTransactionRepaymentTrend,
  getIndustryBenchmark,
  getAIAnalysis,
} from '@/api/analysisReport';

// 导入所有组件
import CreditScoreGauge from './components/CreditScoreGauge';
import RiskAnalysisSunburst from './components/RiskAnalysisSunburst';
import CashFlowSankey from './components/CashFlowSankey';
import TransactionRepaymentChart from './components/TransactionRepaymentChart';
import IndustryBenchmarkChart from './components/IndustryBenchmarkChart';
import AIAnalysisPanel from './components/AIAnalysisPanel';

/**
 * 分析报告主页面
 */
const AnalysisReport: React.FC = () => {
  // 页面状态
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>();
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.MONTH);

  // 获取企业列表
  const { data: enterpriseListData, loading: enterpriseListLoading } = useRequest(
    getEnterpriseList,
    {
      onError: error => {
        console.error('获取统计数据失败:', error);
      },
    }
  );

  // 企业列表
  const enterprises = enterpriseListData?.data?.enterprises || [];

  // 当企业列表加载完成时，自动选择第一个企业
  // 这是一个合理的初始化场景，不会导致级联渲染问题
  useEffect(() => {
    if (enterpriseListData && enterprises.length > 0 && !selectedEnterpriseId) {
      setSelectedEnterpriseId(enterprises[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterpriseListData]);

  // 获取各模块数据
  const { data: creditScoreData, loading: creditScoreLoading } = useRequest(
    () => getCreditScore({ enterpriseId: selectedEnterpriseId!, timeRange }),
    {
      ready: !!selectedEnterpriseId,
      refreshDeps: [selectedEnterpriseId, timeRange],
    }
  );

  const { data: riskAnalysisData, loading: riskAnalysisLoading } = useRequest(
    () => getRiskAnalysis({ enterpriseId: selectedEnterpriseId!, timeRange }),
    {
      ready: !!selectedEnterpriseId,
      refreshDeps: [selectedEnterpriseId, timeRange],
    }
  );

  const { data: cashFlowData, loading: cashFlowLoading } = useRequest(
    () => getSupplyChainCashFlow({ enterpriseId: selectedEnterpriseId!, timeRange }),
    {
      ready: !!selectedEnterpriseId,
      refreshDeps: [selectedEnterpriseId, timeRange],
    }
  );

  const { data: transactionData, loading: transactionLoading } = useRequest(
    () => getTransactionRepaymentTrend({ enterpriseId: selectedEnterpriseId!, timeRange }),
    {
      ready: !!selectedEnterpriseId,
      refreshDeps: [selectedEnterpriseId, timeRange],
    }
  );

  const { data: benchmarkData, loading: benchmarkLoading } = useRequest(
    () => getIndustryBenchmark({ enterpriseId: selectedEnterpriseId!, timeRange }),
    {
      ready: !!selectedEnterpriseId,
      refreshDeps: [selectedEnterpriseId, timeRange],
    }
  );

  const { data: aiAnalysisData, loading: aiAnalysisLoading } = useRequest(
    () => getAIAnalysis({ enterpriseId: selectedEnterpriseId!, timeRange }),
    {
      ready: !!selectedEnterpriseId,
      refreshDeps: [selectedEnterpriseId, timeRange],
    }
  );

  // 企业切换处理
  const handleEnterpriseChange = useMemoizedFn((value: string) => {
    setSelectedEnterpriseId(value);
  });

  // 时间范围切换处理
  const handleTimeRangeChange = useMemoizedFn((value: TimeRange) => {
    setTimeRange(value);
  });

  // 导出报告
  const handleExport = useMemoizedFn(() => {
    console.log('导出报告');
    // TODO: 实现导出功能
  });

  // 打印报告
  const handlePrint = useMemoizedFn(() => {
    window.print();
  });

  // 是否有数据在加载
  const isLoading =
    creditScoreLoading ||
    riskAnalysisLoading ||
    cashFlowLoading ||
    transactionLoading ||
    benchmarkLoading ||
    aiAnalysisLoading;

  // 空状态展示
  if (!enterpriseListLoading && enterprises.length === 0) {
    return (
      <div className="tw-space-y-6">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div>
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">分析报告</h1>
            <p className="tw-mt-1 tw-text-sm tw-text-gray-500">企业信用与供应链金融综合分析报告</p>
          </div>
        </div>
        <Empty description="暂无企业数据，请先在数据管理模块上传企业信息" className="tw-py-20" />
      </div>
    );
  }

  return (
    <div className="tw-space-y-6">
      {/* 页面标题 */}
      <div className="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-gap-4">
        <div>
          <h1 className="tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-2 tw-flex tw-items-center">
            <FileTextOutlined className="tw-mr-3 tw-text-blue-500 tw-text-2xl" />
            分析报告
          </h1>
          <p className="tw-text-sm tw-text-gray-600">企业信用与供应链金融综合分析报告</p>
        </div>

        {/* 操作按钮 */}
        <div className="tw-flex tw-gap-2">
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExport}
            size="large"
            className="tw-shadow-sm hover:tw-shadow-md tw-transition-shadow"
          >
            导出PDF
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            size="large"
            className="tw-shadow-sm hover:tw-shadow-md tw-transition-shadow"
          >
            打印报告
          </Button>
        </div>
      </div>

      {/* 筛选器区域 */}
      <div className="tw-bg-gradient-to-r tw-from-blue-50 tw-via-purple-50 tw-to-pink-50 tw-rounded-2xl tw-p-6 tw-shadow-md tw-border tw-border-blue-100 tw-relative tw-backdrop-blur-sm">
        {/* 数据加载指示器 */}
        {isLoading && (
          <div className="tw-absolute tw-top-4 tw-right-4">
            <Badge
              status="processing"
              text={
                <span className="tw-text-xs tw-text-blue-600 tw-flex tw-items-center tw-gap-1.5 tw-font-medium">
                  <SyncOutlined spin />
                  数据更新中...
                </span>
              }
            />
          </div>
        )}

        <div className="tw-flex tw-items-end tw-justify-between tw-gap-6 tw-flex-wrap">
          {/* 左侧：企业选择器 */}
          <div className="tw-flex-1 tw-max-w-md tw-min-w-[280px]">
            <label className="tw-flex tw-text-sm tw-font-semibold tw-text-gray-700 tw-mb-2 tw-items-center">
              <BankOutlined className="tw-mr-2 tw-text-blue-500" />
              选择企业
            </label>
            <Select
              value={selectedEnterpriseId}
              onChange={handleEnterpriseChange}
              loading={enterpriseListLoading}
              showSearch
              placeholder={
                <span className="tw-flex tw-items-center tw-text-gray-400">
                  <SearchOutlined className="tw-mr-2" />
                  搜索或选择企业
                </span>
              }
              className="tw-w-full"
              size="large"
              options={enterprises.map(e => ({
                label: e.name,
                value: e.id,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>

          {/* 右侧：时间范围筛选器 */}
          <div>
            <label className="tw-flex tw-text-sm tw-font-semibold tw-text-gray-700 tw-mb-2 tw-items-center">
              <CalendarOutlined className="tw-mr-2 tw-text-purple-500" />
              时间范围
            </label>
            <Segmented
              value={timeRange}
              onChange={handleTimeRangeChange as (value: string | number) => void}
              options={Object.values(TimeRange).map(value => ({
                label: TIME_RANGE_LABELS[value],
                value,
              }))}
              size="large"
              className="tw-shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      {selectedEnterpriseId ? (
        <div className="tw-space-y-6">
          {/* 第一行：综合信用评分 */}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <CreditScoreGauge data={creditScoreData?.data} loading={creditScoreLoading} />
            </Col>
          </Row>

          {/* 第二行：风险分析 */}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <RiskAnalysisSunburst data={riskAnalysisData?.data} loading={riskAnalysisLoading} />
            </Col>
          </Row>

          {/* 第三行：资金流向 */}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <CashFlowSankey data={cashFlowData?.data} loading={cashFlowLoading} />
            </Col>
          </Row>

          {/* 第四行：交易还款趋势 + 行业对比 */}
          <Row gutter={[24, 24]}>
            <Col xs={24} xl={12}>
              <TransactionRepaymentChart
                data={transactionData?.data}
                loading={transactionLoading}
              />
            </Col>
            <Col xs={24} xl={12}>
              <IndustryBenchmarkChart data={benchmarkData?.data} loading={benchmarkLoading} />
            </Col>
          </Row>

          {/* 第五行：AI智能分析与建议 */}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <AIAnalysisPanel data={aiAnalysisData?.data} loading={aiAnalysisLoading} />
            </Col>
          </Row>
        </div>
      ) : (
        <div className="tw-flex tw-items-center tw-justify-center tw-py-32">
          <Spin size="large" tip="加载中..." />
        </div>
      )}
    </div>
  );
};

export default AnalysisReport;
