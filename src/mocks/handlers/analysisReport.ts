/**
 * 分析报告 Mock Handlers
 * 职责：处理 HTTP 请求，返回数据（静态数据或动态生成）
 */
import { http, HttpResponse, delay } from 'msw';
import mockData from '../data/analysisReport.json';
import {
  generateCreditScore,
  generateRiskAnalysis,
  generateCashFlow,
  generateTransactionTrend,
  generateBenchmark,
  generateAIAnalysis,
} from '../generators/analysisReportGenerator';

/**
 * 获取数据（优先静态，不存在则动态生成）
 * 现在所有标准企业和时间范围的数据都已预生成，动态生成仅作为兜底方案
 */
function getData<T>(
  dataSource: Record<string, Record<string, T>>,
  enterpriseId: string,
  timeRange: string,
  generator: (enterpriseId: string, timeRange: string) => T | null
): T | null {
  // 1. 尝试获取该企业该时间范围的静态数据（现在应该总是存在）
  const staticData = dataSource[enterpriseId]?.[timeRange];
  if (staticData) return staticData;

  // 2. 兜底：动态生成数据（仅在添加新企业或新时间范围时才会触发）
  console.warn(
    `⚠️ 静态数据不存在，使用动态生成: enterpriseId=${enterpriseId}, timeRange=${timeRange}`
  );
  return generator(enterpriseId, timeRange);
}

export const analysisReportHandlers = [
  // 获取企业列表
  http.get('/api/analysisReport/enterprises', async () => {
    await delay(300);
    return HttpResponse.json({
      code: 0,
      data: {
        enterprises: mockData.enterpriseList,
        total: mockData.enterpriseList.length,
      },
      message: 'success',
    });
  }),

  // 获取综合信用评分
  http.get('/api/analysisReport/creditScore', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const data = getData(mockData.creditScore, enterpriseId, timeRange, generateCreditScore);

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),

  // 获取风险分析
  http.get('/api/analysisReport/riskAnalysis', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const data = getData(mockData.riskAnalysis, enterpriseId, timeRange, generateRiskAnalysis);

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),

  // 获取供应链资金流向
  http.get('/api/analysisReport/cashFlow', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const data = getData(mockData.supplyChainCashFlow, enterpriseId, timeRange, generateCashFlow);

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),

  // 获取交易还款趋势
  http.get('/api/analysisReport/transactionTrend', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const data = getData(
      mockData.transactionRepaymentTrend,
      enterpriseId,
      timeRange,
      generateTransactionTrend
    );

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),

  // 获取行业对标
  http.get('/api/analysisReport/benchmark', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const data = getData(mockData.industryBenchmark, enterpriseId, timeRange, generateBenchmark);

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),

  // 获取AI智能分析
  http.get('/api/analysisReport/aiAnalysis', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const data = getData(mockData.aiAnalysis, enterpriseId, timeRange, generateAIAnalysis);

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),

  // 获取完整分析报告
  http.get('/api/analysisReport/fullReport', async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId') || 'E001';
    const timeRange = url.searchParams.get('timeRange') || 'month';

    const enterprise = mockData.enterpriseList.find(e => e.id === enterpriseId);

    const data = {
      enterpriseId,
      enterpriseName: enterprise?.name || '未知企业',
      reportDate: new Date().toISOString(),
      timeRange,
      creditScore: getData(mockData.creditScore, enterpriseId, timeRange, generateCreditScore),
      riskAnalysis: getData(mockData.riskAnalysis, enterpriseId, timeRange, generateRiskAnalysis),
      cashFlow: getData(mockData.supplyChainCashFlow, enterpriseId, timeRange, generateCashFlow),
      transactionRepaymentTrend: getData(
        mockData.transactionRepaymentTrend,
        enterpriseId,
        timeRange,
        generateTransactionTrend
      ),
      industryBenchmark: getData(
        mockData.industryBenchmark,
        enterpriseId,
        timeRange,
        generateBenchmark
      ),
      aiAnalysis: getData(mockData.aiAnalysis, enterpriseId, timeRange, generateAIAnalysis),
    };

    return HttpResponse.json({
      code: 0,
      data,
      message: 'success',
    });
  }),
];
