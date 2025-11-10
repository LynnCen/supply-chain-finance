import { useRequest } from 'ahooks';
import { TimeRange } from '@/types/enterpriseDashboard';
import {
  getEnterpriseList,
  getEnterpriseBasicInfo,
  getFinancialHealth,
  getTransactionTrend,
  getOrderStatistics,
  getPartners,
  getEnterpriseRanking,
} from '@/api/enterpriseDashboard';

/**
 * 企业看板业务逻辑Hook
 * 管理所有数据请求和状态
 */
export const useEnterpriseDashboard = (enterpriseId?: string, timeRange?: TimeRange) => {
  // 获取企业列表（用于选择器）
  const {
    data: enterpriseListData,
    loading: enterpriseListLoading,
    error: enterpriseListError,
  } = useRequest(getEnterpriseList, {
    onError: error => {
      console.error('获取企业列表失败:', error);
    },
  });

  // 获取企业基本信息
  const {
    data: basicInfoData,
    loading: basicInfoLoading,
    error: basicInfoError,
    refresh: refreshBasicInfo,
  } = useRequest(() => getEnterpriseBasicInfo(enterpriseId!), {
    ready: !!enterpriseId,
    refreshDeps: [enterpriseId],
    onError: error => {
      console.error('获取企业基本信息失败:', error);
    },
  });

  // 获取财务健康数据
  const {
    data: financialHealthData,
    loading: financialHealthLoading,
    error: financialHealthError,
    refresh: refreshFinancialHealth,
  } = useRequest(
    () =>
      getFinancialHealth({
        enterpriseId: enterpriseId!,
        timeRange: timeRange || TimeRange.MONTH,
      }),
    {
      ready: !!enterpriseId && !!timeRange,
      refreshDeps: [enterpriseId, timeRange],
      onError: error => {
        console.error('获取财务健康数据失败:', error);
      },
    }
  );

  // 获取交易趋势数据
  const {
    data: transactionTrendData,
    loading: transactionTrendLoading,
    error: transactionTrendError,
    refresh: refreshTransactionTrend,
  } = useRequest(
    () =>
      getTransactionTrend({
        enterpriseId: enterpriseId!,
        timeRange: timeRange || TimeRange.MONTH,
      }),
    {
      ready: !!enterpriseId && !!timeRange,
      refreshDeps: [enterpriseId, timeRange],
      onError: error => {
        console.error('获取交易趋势数据失败:', error);
      },
    }
  );

  // 获取订单统计数据
  const {
    data: orderStatisticsData,
    loading: orderStatisticsLoading,
    error: orderStatisticsError,
    refresh: refreshOrderStatistics,
  } = useRequest(
    () =>
      getOrderStatistics({
        enterpriseId: enterpriseId!,
        timeRange: timeRange || TimeRange.MONTH,
      }),
    {
      ready: !!enterpriseId && !!timeRange,
      refreshDeps: [enterpriseId, timeRange],
      onError: error => {
        console.error('获取订单统计数据失败:', error);
      },
    }
  );

  // 获取合作伙伴列表
  const {
    data: partnersData,
    loading: partnersLoading,
    error: partnersError,
    refresh: refreshPartners,
  } = useRequest(() => getPartners(enterpriseId!), {
    ready: !!enterpriseId,
    refreshDeps: [enterpriseId],
    onError: error => {
      console.error('获取合作伙伴列表失败:', error);
    },
  });

  // 获取企业排行榜
  const {
    data: rankingData,
    loading: rankingLoading,
    error: rankingError,
    refresh: refreshRanking,
  } = useRequest(getEnterpriseRanking, {
    onError: error => {
      console.error('获取企业排行榜失败:', error);
    },
  });

  // 刷新所有数据
  const refreshAll = () => {
    if (enterpriseId) {
      refreshBasicInfo();
      refreshPartners();
    }
    if (enterpriseId && timeRange) {
      refreshFinancialHealth();
      refreshTransactionTrend();
      refreshOrderStatistics();
    }
    refreshRanking();
  };

  return {
    // 企业列表
    enterpriseList: enterpriseListData?.data?.enterprises || [],
    enterpriseListLoading,
    enterpriseListError,

    // 企业基本信息
    basicInfo: basicInfoData?.data,
    basicInfoLoading,
    basicInfoError,

    // 财务健康数据
    financialHealth: financialHealthData?.data?.metrics,
    financialHealthLoading,
    financialHealthError,

    // 交易趋势数据
    transactionTrend: transactionTrendData?.data?.data,
    transactionTrendLoading,
    transactionTrendError,

    // 订单统计数据
    orderStatistics: orderStatisticsData?.data?.data,
    orderStatisticsLoading,
    orderStatisticsError,

    // 合作伙伴列表
    partners: partnersData?.data?.partners || [],
    partnersLoading,
    partnersError,

    // 企业排行榜
    ranking: rankingData?.data?.rankings || [],
    rankingLoading,
    rankingError,

    // 刷新方法
    refreshAll,
  };
};

