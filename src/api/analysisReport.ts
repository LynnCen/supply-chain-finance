/**
 * 分析报告API接口
 */
import request from '@/utils/request';
import type {
  EnterpriseListResponse,
  CreditScoreResponse,
  RiskAnalysisResponse,
  SupplyChainCashFlowResponse,
  TransactionRepaymentTrendResponse,
  IndustryBenchmarkResponse,
  AIAnalysisResponse,
  FullAnalysisReportResponse,
  AnalysisReportParams,
} from '@/types/analysisReport';

/**
 * 获取企业列表
 */
export function getEnterpriseList() {
  return request.get<EnterpriseListResponse>('/analysisReport/enterprises');
}

/**
 * 获取综合信用评分
 */
export function getCreditScore(params: AnalysisReportParams) {
  return request.get<CreditScoreResponse>('/analysisReport/creditScore', { params });
}

/**
 * 获取多维风险分析
 */
export function getRiskAnalysis(params: AnalysisReportParams) {
  return request.get<RiskAnalysisResponse>('/analysisReport/riskAnalysis', { params });
}

/**
 * 获取供应链资金流向
 */
export function getSupplyChainCashFlow(params: AnalysisReportParams) {
  return request.get<SupplyChainCashFlowResponse>('/analysisReport/cashFlow', { params });
}

/**
 * 获取交易与还款趋势
 */
export function getTransactionRepaymentTrend(params: AnalysisReportParams) {
  return request.get<TransactionRepaymentTrendResponse>('/analysisReport/transactionTrend', {
    params,
  });
}

/**
 * 获取行业对比分析
 */
export function getIndustryBenchmark(params: AnalysisReportParams) {
  return request.get<IndustryBenchmarkResponse>('/analysisReport/benchmark', { params });
}

/**
 * 获取AI智能分析与预警
 */
export function getAIAnalysis(params: AnalysisReportParams) {
  return request.get<AIAnalysisResponse>('/analysisReport/aiAnalysis', { params });
}

/**
 * 获取完整分析报告（一次性获取所有数据）
 */
export function getFullAnalysisReport(params: AnalysisReportParams) {
  return request.get<FullAnalysisReportResponse>('/analysisReport/fullReport', { params });
}
