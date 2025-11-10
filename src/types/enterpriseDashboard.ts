// 企业看板模块类型定义

// 时间范围枚举
export enum TimeRange {
  MONTH = 'month', // 本月
  QUARTER = 'quarter', // 本季度
  YEAR = 'year', // 本年度
  ALL = 'all', // 全部
}

// 时间范围标签
export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  [TimeRange.MONTH]: '本月',
  [TimeRange.QUARTER]: '本季度',
  [TimeRange.YEAR]: '本年度',
  [TimeRange.ALL]: '全部',
};

// 企业基本信息
export interface EnterpriseBasicInfo {
  id: string;
  enterpriseName: string; // 企业名称
  creditCode: string; // 统一社会信用代码
  legalPerson: string; // 法人代表
  registeredCapital: number; // 注册资本（万元）
  industry: string; // 所属行业
  industryLabel: string; // 行业显示名称
  creditRating: string; // 信用等级
  registerDate: string; // 注册日期
  // 联系方式
  contactPhone: string; // 联系电话
  contactEmail: string; // 联系邮箱
  contactAddress: string; // 联系地址
  // 供应链角色
  chainRole: 'core' | 'supplier' | 'distributor' | 'logistics'; // 供应链角色
  chainRoleLabel: string; // 角色显示名称
  // 额外信息
  establishedYears: number; // 成立年限
  employeeCount: string; // 员工规模
  businessStatus: string; // 经营状态
  mainBusiness: string; // 主营业务
}

// 财务健康指标
export interface FinancialHealthMetrics {
  // 偿债能力
  assetLiabilityRatio: number; // 资产负债率 (0-100)
  currentRatio: number; // 流动比率
  quickRatio: number; // 速动比率
  // 盈利能力
  netProfitMargin: number; // 净利润率 (0-100)
  roe: number; // 净资产收益率 ROE (0-100)
  roa: number; // 总资产收益率 ROA (0-100)
  // 运营能力
  receivableTurnover: number; // 应收账款周转率（次）
  inventoryTurnover: number; // 存货周转率（次）
  // 成长能力
  revenueGrowthRate: number; // 营收增长率 (%)
  profitGrowthRate: number; // 利润增长率 (%)
  // 风险指标
  overdueRate: number; // 逾期率 (0-100)
  defaultRate: number; // 违约率 (0-100)
  // 供应链特有指标
  cashConversionCycle: number; // 现金周期（天）
  supplyChainFinanceRatio: number; // 供应链融资占比 (0-100)
  creditUtilizationRate: number; // 信用额度使用率 (0-100)
  // 综合评分（用于排行榜）
  comprehensiveScore: number; // 综合评分 (0-100)
}

// 交易趋势数据点
export interface TransactionTrendPoint {
  date: string; // 日期（格式：YYYY-MM-DD 或 YYYY-MM 或 YYYY）
  amount: number; // 交易金额（元）
  count: number; // 交易笔数
}

// 交易趋势数据
export interface TransactionTrend {
  timeline: TransactionTrendPoint[]; // 时间序列数据
  totalAmount: number; // 总交易金额
  totalCount: number; // 总交易笔数
  avgAmount: number; // 平均交易金额
  // 统计信息
  maxAmount: number; // 最高交易金额
  maxAmountDate: string; // 最高交易金额日期
  minAmount: number; // 最低交易金额
  minAmountDate: string; // 最低交易金额日期
}

// 订单统计数据点
export interface OrderStatisticsPoint {
  category: string; // 类别（如：采购订单、销售订单）
  count: number; // 订单数量
  amount: number; // 订单金额（元）
}

// 订单统计数据
export interface OrderStatistics {
  byType: OrderStatisticsPoint[]; // 按类型统计
  timeline: Array<{
    date: string; // 日期
    count: number; // 订单数量
  }>; // 时间序列
  totalCount: number; // 总订单数
  totalAmount: number; // 总订单金额
}

// 合作伙伴信息
export interface Partner {
  id: string;
  partnerName: string; // 合作伙伴名称
  partnerType: 'supplier' | 'customer'; // 合作伙伴类型
  partnerTypeLabel: string; // 类型显示名称
  cooperationYears: number; // 合作年限（年）
  transactionAmount: number; // 累计交易金额（元）
  transactionCount: number; // 累计交易笔数
  creditRating: string; // 信用等级
  lastTransactionDate: string; // 最后交易日期
  status: 'active' | 'inactive'; // 合作状态
  statusLabel: string; // 状态显示名称
}

// 企业排名项
export interface EnterpriseRankingItem {
  rank: number; // 排名
  enterpriseId: string; // 企业ID
  enterpriseName: string; // 企业名称
  comprehensiveScore: number; // 综合评分 (0-100)
  creditRating: string; // 信用等级
  transactionAmount: number; // 交易金额（元）
  trend: 'up' | 'down' | 'stable'; // 排名趋势
  trendValue: number; // 趋势变化值（排名变化）
}

// 企业列表项（用于选择器）
export interface EnterpriseListItem {
  id: string;
  name: string;
  creditRating: string;
  industry: string;
}

// API请求参数
export interface EnterpriseDashboardQueryParams {
  enterpriseId: string;
  timeRange: TimeRange;
}

// API响应类型
export type EnterpriseBasicInfoResponse = EnterpriseBasicInfo;

export interface FinancialHealthResponse {
  enterpriseId: string;
  timeRange: TimeRange;
  metrics: FinancialHealthMetrics;
  updateTime: string; // 更新时间
}

export interface TransactionTrendResponse {
  enterpriseId: string;
  timeRange: TimeRange;
  data: TransactionTrend;
}

export interface OrderStatisticsResponse {
  enterpriseId: string;
  timeRange: TimeRange;
  data: OrderStatistics;
}

export interface PartnersResponse {
  enterpriseId: string;
  partners: Partner[];
  total: number;
}

export interface EnterpriseRankingResponse {
  rankings: EnterpriseRankingItem[];
  updateTime: string; // 更新时间
}

export interface EnterpriseListResponse {
  enterprises: EnterpriseListItem[];
  total: number;
}
