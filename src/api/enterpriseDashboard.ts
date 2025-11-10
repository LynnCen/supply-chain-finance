import request from '@/utils/request';
import type {
  EnterpriseListResponse,
  EnterpriseBasicInfoResponse,
  FinancialHealthResponse,
  TransactionTrendResponse,
  OrderStatisticsResponse,
  PartnersResponse,
  EnterpriseRankingResponse,
  EnterpriseDashboardQueryParams,
} from '@/types/enterpriseDashboard';

/**
 * 获取企业列表（用于选择器）
 */
export function getEnterpriseList() {
  return request.get<EnterpriseListResponse>('/enterpriseDashboard/enterprises');
}

/**
 * 获取企业基本信息
 */
export function getEnterpriseBasicInfo(enterpriseId: string) {
  return request.get<EnterpriseBasicInfoResponse>('/enterpriseDashboard/basicInfo', {
    params: { enterpriseId },
  });
}

/**
 * 获取财务健康数据
 */
export function getFinancialHealth(params: EnterpriseDashboardQueryParams) {
  return request.get<FinancialHealthResponse>('/enterpriseDashboard/financialHealth', {
    params,
  });
}

/**
 * 获取交易趋势数据
 */
export function getTransactionTrend(params: EnterpriseDashboardQueryParams) {
  return request.get<TransactionTrendResponse>('/enterpriseDashboard/transactionTrend', {
    params,
  });
}

/**
 * 获取订单统计数据
 */
export function getOrderStatistics(params: EnterpriseDashboardQueryParams) {
  return request.get<OrderStatisticsResponse>('/enterpriseDashboard/orderStatistics', {
    params,
  });
}

/**
 * 获取合作伙伴列表
 */
export function getPartners(enterpriseId: string) {
  return request.get<PartnersResponse>('/enterpriseDashboard/partners', {
    params: { enterpriseId },
  });
}

/**
 * 获取企业排行榜
 */
export function getEnterpriseRanking() {
  return request.get<EnterpriseRankingResponse>('/enterpriseDashboard/ranking');
}

