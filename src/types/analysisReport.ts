/**
 * 分析报告模块类型定义
 * 供应链金融场景下的企业信用与风险分析
 */

// ==================== 时间范围 ====================
export enum TimeRange {
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
  ALL = 'all',
}

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  [TimeRange.MONTH]: '本月',
  [TimeRange.QUARTER]: '本季度',
  [TimeRange.YEAR]: '本年度',
  [TimeRange.ALL]: '全部',
};

// ==================== 企业列表 ====================
export interface EnterpriseListItem {
  id: string;
  name: string;
  creditRating: string;
}

export interface EnterpriseListResponse {
  enterprises: EnterpriseListItem[];
  total: number;
}

// ==================== 综合信用评分 ====================
export interface CreditScore {
  score: number; // 综合信用评分 0-1000
  level: 'excellent' | 'good' | 'medium' | 'poor' | 'bad'; // 信用等级
  levelLabel: string; // 等级标签
  trend: 'up' | 'down' | 'stable'; // 趋势
  trendValue: number; // 趋势变化值
  // 分项得分
  breakdown: {
    paymentHistory: number; // 还款历史 0-200
    debtBurden: number; // 债务负担 0-200
    businessStability: number; // 经营稳定性 0-200
    industryStatus: number; // 行业地位 0-200
    supplyChainHealth: number; // 供应链健康度 0-200
  };
  // 历史趋势
  history: Array<{
    date: string;
    score: number;
  }>;
}

export type CreditScoreResponse = CreditScore;

// ==================== 多维风险分析 ====================
export interface RiskNode {
  name: string;
  value: number;
  level?: number; // 风险等级 1-5
  children?: RiskNode[];
  itemStyle?: {
    color?: string;
  };
}

export interface RiskAnalysis {
  // 旭日图数据
  riskTree: RiskNode[];
  // 风险统计
  summary: {
    totalRiskPoints: number; // 总风险点数
    highRiskCount: number; // 高风险数量
    mediumRiskCount: number; // 中风险数量
    lowRiskCount: number; // 低风险数量
  };
  // 风险详情列表
  riskDetails: Array<{
    category: string; // 风险类别
    subcategory: string; // 子类别
    level: 'high' | 'medium' | 'low'; // 风险等级
    description: string; // 风险描述
    suggestion: string; // 改进建议
  }>;
}

export type RiskAnalysisResponse = RiskAnalysis;

// ==================== 供应链资金流向 ====================
export interface CashFlowNode {
  name: string;
}

export interface CashFlowLink {
  source: string;
  target: string;
  value: number; // 资金流量（万元）
}

export interface SupplyChainCashFlow {
  nodes: CashFlowNode[];
  links: CashFlowLink[];
  // 统计信息
  summary: {
    totalInflow: number; // 总流入（万元）
    totalOutflow: number; // 总流出（万元）
    netCashFlow: number; // 净现金流（万元）
    majorSuppliers: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
    majorCustomers: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
  };
}

export type SupplyChainCashFlowResponse = SupplyChainCashFlow;

// ==================== 交易与还款趋势 ====================
export interface TransactionRepaymentTrend {
  // 交易趋势
  transactionTrend: Array<{
    date: string;
    count: number; // 交易笔数
    amount: number; // 交易金额（万元）
  }>;
  // 还款趋势
  repaymentTrend: Array<{
    date: string;
    onTimeCount: number; // 按时还款笔数
    lateCount: number; // 逾期还款笔数
    defaultCount: number; // 违约笔数
    onTimeRate: number; // 按时还款率
  }>;
  // 统计摘要
  summary: {
    totalTransactions: number; // 总交易笔数
    totalTransactionAmount: number; // 总交易金额
    avgTransactionAmount: number; // 平均交易金额
    totalRepayments: number; // 总还款笔数
    onTimeRepaymentRate: number; // 按时还款率
    avgRepaymentDelay: number; // 平均逾期天数
  };
}

export type TransactionRepaymentTrendResponse = TransactionRepaymentTrend;

// ==================== 行业对比分析 ====================
export interface IndustryBenchmark {
  // 当前企业指标
  currentEnterprise: {
    name: string;
    creditScore: number;
    revenue: number; // 营收（万元）
    profitMargin: number; // 利润率（%）
    debtRatio: number; // 资产负债率（%）
    turnoverRate: number; // 周转率
    supplyChainEfficiency: number; // 供应链效率分
  };
  // 行业平均水平
  industryAverage: {
    creditScore: number;
    revenue: number;
    profitMargin: number;
    debtRatio: number;
    turnoverRate: number;
    supplyChainEfficiency: number;
  };
  // 行业TOP企业对比
  topEnterprises: Array<{
    name: string;
    creditScore: number;
    revenue: number;
    profitMargin: number;
    ranking: number;
  }>;
  // 行业分布（散点图数据）
  industryDistribution: Array<{
    name: string;
    creditScore: number;
    revenue: number;
    isCurrentEnterprise: boolean;
  }>;
  // 排名信息
  rankings?: {
    creditScoreRank: number; // 信用评分排名
    revenueRank: number; // 营收排名
    profitMarginRank: number; // 利润率排名
    totalEnterprises: number; // 行业总企业数
  };
  // 排名信息（新格式）
  ranking?: {
    rank: number; // 综合排名
    percentile: number; // 超越百分比
  };
}

export type IndustryBenchmarkResponse = IndustryBenchmark;

// ==================== AI智能分析与预警 ====================
export interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'suggestion' | 'analysis'; // 洞察类型
  level: 'critical' | 'high' | 'medium' | 'low'; // 重要程度
  category: string; // 类别
  title: string; // 标题
  content: string; // 内容
  data?: Record<string, any>; // 相关数据
  timestamp: string; // 生成时间
  actions?: Array<{
    // 建议操作
    label: string;
    type: 'primary' | 'default';
    description: string;
  }>;
}

export interface AIAnalysis {
  // 综合评价
  overallAssessment: {
    rating: 'excellent' | 'good' | 'fair' | 'poor'; // 综合评级
    ratingLabel: string;
    summary: string; // 总结
    strengths: string[]; // 优势
    weaknesses: string[]; // 劣势
    opportunities: string[]; // 机会
    threats: string[]; // 威胁
  };
  // AI洞察列表
  insights: AIInsight[];
  // 风险预警
  warnings: Array<{
    id: string;
    level: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    affectedAreas: string[]; // 影响范围
    suggestedActions: string[]; // 建议措施
    deadline?: string; // 需处理的截止时间
  }>;
  // 业务建议
  recommendations: Array<{
    id: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    expectedImpact: string; // 预期影响
    implementationDifficulty: 'easy' | 'medium' | 'hard'; // 实施难度
    estimatedCost?: string; // 预估成本
  }>;
}

export type AIAnalysisResponse = AIAnalysis;

// ==================== 完整分析报告（综合查询） ====================
export interface FullAnalysisReport {
  enterpriseId: string;
  enterpriseName: string;
  reportDate: string;
  timeRange: TimeRange;
  creditScore: CreditScore;
  riskAnalysis: RiskAnalysis;
  cashFlow: SupplyChainCashFlow;
  transactionRepaymentTrend: TransactionRepaymentTrend;
  industryBenchmark: IndustryBenchmark;
  aiAnalysis: AIAnalysis;
}

export type FullAnalysisReportResponse = FullAnalysisReport;

// ==================== API请求参数 ====================
export interface AnalysisReportParams {
  enterpriseId: string;
  timeRange: TimeRange;
}
