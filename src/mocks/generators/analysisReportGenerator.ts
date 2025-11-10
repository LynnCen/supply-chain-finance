/**
 * 分析报告 Mock 数据生成器
 * 职责：根据企业ID和时间范围动态生成符合逻辑关联的数据
 */
import mockData from '../data/analysisReport.json';

/**
 * 企业配置
 */
export const ENTERPRISE_CONFIG = {
  E001: { name: '华夏供应链科技有限公司', creditRating: 'AAA', scoreMultiplier: 1.0 },
  E002: { name: '东方物流集团', creditRating: 'AA', scoreMultiplier: 0.85 },
  E003: { name: '盛世贸易有限公司', creditRating: 'A', scoreMultiplier: 0.72 },
} as const;

type EnterpriseId = keyof typeof ENTERPRISE_CONFIG;

/**
 * 获取企业配置
 */
function getEnterpriseConfig(enterpriseId: string) {
  return ENTERPRISE_CONFIG[enterpriseId as EnterpriseId] || ENTERPRISE_CONFIG.E001;
}

/**
 * 获取基础数据（优先使用静态数据，不存在则使用 E001.month 作为模板）
 */
function getBaseData<T>(
  dataSource: Record<string, Record<string, T>>,
  enterpriseId: string,
  timeRange: string
): T | null {
  // 优先使用该企业该时间范围的静态数据
  const enterpriseData = dataSource[enterpriseId];
  if (enterpriseData?.[timeRange]) {
    return enterpriseData[timeRange];
  }

  // 使用 E001 的该时间范围数据作为模板
  if (dataSource.E001?.[timeRange]) {
    return dataSource.E001[timeRange];
  }

  // 兜底使用 E001.month
  return dataSource.E001?.month || null;
}

/**
 * 计算信用等级
 */
function getCreditLevel(score: number): {
  level: string;
  levelLabel: string;
} {
  if (score >= 850) return { level: 'excellent', levelLabel: '优秀' };
  if (score >= 750) return { level: 'good', levelLabel: '良好' };
  if (score >= 650) return { level: 'medium', levelLabel: '中等' };
  if (score >= 550) return { level: 'poor', levelLabel: '较差' };
  return { level: 'bad', levelLabel: '差' };
}

/**
 * 生成信用评分数据
 */
export function generateCreditScore(enterpriseId: string, timeRange: string) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.creditScore, enterpriseId, timeRange);

  if (!baseData) return null;

  const score = Math.round(baseData.score * config.scoreMultiplier);
  const { level, levelLabel } = getCreditLevel(score);

  return {
    score,
    level,
    levelLabel,
    trend: baseData.trend,
    trendValue: Math.round(baseData.trendValue * config.scoreMultiplier),
    breakdown: {
      paymentHistory: Math.round(baseData.breakdown.paymentHistory * config.scoreMultiplier),
      debtBurden: Math.round(baseData.breakdown.debtBurden * config.scoreMultiplier),
      businessStability: Math.round(
        baseData.breakdown.businessStability * config.scoreMultiplier
      ),
      industryStatus: Math.round(baseData.breakdown.industryStatus * config.scoreMultiplier),
      supplyChainHealth: Math.round(
        baseData.breakdown.supplyChainHealth * config.scoreMultiplier
      ),
    },
    history: baseData.history.map(h => ({
      ...h,
      score: Math.round(h.score * config.scoreMultiplier),
    })),
  };
}

/**
 * 生成风险分析数据（风险与信用评分成反比）
 */
export function generateRiskAnalysis(enterpriseId: string, timeRange: string) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.riskAnalysis, enterpriseId, timeRange);

  if (!baseData) return null;

  // 信用评分越低，风险倍数越高
  const riskMultiplier = 2.0 - config.scoreMultiplier;

  const processRiskNode = (node: any): any => {
    const processed = {
      ...node,
      value: Math.round(node.value * riskMultiplier),
    };

    if (node.level) {
      processed.level = Math.min(4, Math.round(node.level * riskMultiplier));
    }

    if (node.children) {
      processed.children = node.children.map(processRiskNode);
    }

    return processed;
  };

  return {
    riskTree: baseData.riskTree.map(processRiskNode),
    summary: {
      totalRiskPoints: Math.round(baseData.summary.totalRiskPoints * riskMultiplier),
      highRiskCount: Math.ceil(baseData.summary.highRiskCount * riskMultiplier),
      mediumRiskCount: Math.round(baseData.summary.mediumRiskCount * riskMultiplier),
      lowRiskCount: Math.max(
        1,
        Math.floor(baseData.summary.lowRiskCount / riskMultiplier)
      ),
    },
    riskDetails: baseData.riskDetails,
  };
}

/**
 * 生成供应链资金流向数据
 */
export function generateCashFlow(enterpriseId: string, timeRange: string) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.supplyChainCashFlow, enterpriseId, timeRange);

  if (!baseData) return null;

  const multiplier = config.scoreMultiplier;

  return {
    nodes: baseData.nodes.map(node => ({
      ...node,
      name: node.name.includes('华夏供应链科技') ? config.name : node.name,
    })),
    links: baseData.links.map(link => ({
      ...link,
      source: link.source.includes('华夏供应链科技') ? config.name : link.source,
      target: link.target.includes('华夏供应链科技') ? config.name : link.target,
      value: Math.round(link.value * multiplier),
    })),
    summary: {
      totalInflow: Math.round(baseData.summary.totalInflow * multiplier),
      totalOutflow: Math.round(baseData.summary.totalOutflow * multiplier),
      netCashFlow: Math.round(baseData.summary.netCashFlow * multiplier),
      majorSuppliers: baseData.summary.majorSuppliers.map(s => ({
        ...s,
        amount: Math.round(s.amount * multiplier),
      })),
      majorCustomers: baseData.summary.majorCustomers.map(c => ({
        ...c,
        amount: Math.round(c.amount * multiplier),
      })),
    },
  };
}

/**
 * 生成交易还款趋势数据（还款率与信用评分成正比）
 */
export function generateTransactionTrend(enterpriseId: string, timeRange: string) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.transactionRepaymentTrend, enterpriseId, timeRange);

  if (!baseData) return null;

  const multiplier = config.scoreMultiplier;
  const repaymentQuality = config.scoreMultiplier * 0.98;

  return {
    transactionTrend: baseData.transactionTrend.map(item => ({
      ...item,
      count: Math.round(item.count * multiplier),
      amount: Math.round(item.amount * multiplier),
    })),
    repaymentTrend: baseData.repaymentTrend.map(item => {
      const totalCount = Math.round((item.onTimeCount + item.lateCount) * multiplier);
      const onTimeCount = Math.round(totalCount * repaymentQuality);
      const lateCount = totalCount - onTimeCount;

      return {
        ...item,
        onTimeCount,
        lateCount: Math.max(0, lateCount),
        defaultCount: item.defaultCount || 0,
        onTimeRate: totalCount > 0 ? Math.round((onTimeCount / totalCount) * 10000) / 100 : 0,
      };
    }),
    summary: {
      totalTransactions: Math.round(baseData.summary.totalTransactions * multiplier),
      totalTransactionAmount: Math.round(baseData.summary.totalTransactionAmount * multiplier),
      avgTransactionAmount:
        Math.round(baseData.summary.avgTransactionAmount * multiplier * 100) / 100,
      totalRepayments: Math.round(baseData.summary.totalRepayments * multiplier),
      onTimeRepaymentRate:
        Math.round(baseData.summary.onTimeRepaymentRate * repaymentQuality * 100) / 100,
      avgRepaymentDelay: baseData.summary.avgRepaymentDelay * (2 - repaymentQuality),
    },
  };
}

/**
 * 生成行业对比数据（排名与信用评分成反比）
 */
export function generateBenchmark(enterpriseId: string, timeRange: string) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.industryBenchmark, enterpriseId, timeRange);

  if (!baseData) return null;

  const multiplier = config.scoreMultiplier;
  const rankMultiplier = 2.0 - multiplier; // 分数越低，排名越靠后

  return {
    currentEnterprise: {
      name: config.name,
      creditScore: Math.round(baseData.currentEnterprise.creditScore * multiplier),
      revenue: Math.round(baseData.currentEnterprise.revenue * multiplier),
      profitMargin: Math.round(baseData.currentEnterprise.profitMargin * multiplier * 100) / 100,
      debtRatio:
        Math.round(baseData.currentEnterprise.debtRatio * (1 + (1 - multiplier) * 0.3) * 100) /
        100,
      turnoverRate:
        Math.round(baseData.currentEnterprise.turnoverRate * multiplier * 100) / 100,
      supplyChainEfficiency: Math.round(
        baseData.currentEnterprise.supplyChainEfficiency * multiplier
      ),
    },
    industryAverage: baseData.industryAverage,
    topEnterprises: baseData.topEnterprises,
    industryDistribution: baseData.industryDistribution.map(e =>
      e.isCurrentEnterprise
        ? {
            ...e,
            name: config.name,
            creditScore: Math.round(e.creditScore * multiplier),
            revenue: Math.round(e.revenue * multiplier),
          }
        : e
    ),
    rankings: baseData.rankings || {
      creditScoreRank: Math.min(156, Math.round(8 * rankMultiplier)),
      revenueRank: Math.min(156, Math.round(8 * rankMultiplier)),
      profitMarginRank: Math.min(156, Math.round(12 * rankMultiplier)),
      totalEnterprises: 156,
    },
    ranking: baseData.ranking || {
      rank: Math.min(156, Math.round(8 * rankMultiplier)),
      percentile: Math.max(0, Math.round((1 - 8 * rankMultiplier / 156) * 1000) / 10),
    },
  };
}

/**
 * 生成 AI 分析数据
 */
export function generateAIAnalysis(enterpriseId: string, timeRange: string) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.aiAnalysis, enterpriseId, timeRange);

  if (!baseData) return null;

  return {
    overallAssessment: {
      ...baseData.overallAssessment,
      summary: baseData.overallAssessment.summary.replace(/华夏供应链科技/g, config.name),
    },
    insights: baseData.insights.map(insight => ({
      ...insight,
      content: insight.content.replace(/华夏供应链科技/g, config.name),
    })),
    warnings: baseData.warnings,
    recommendations: baseData.recommendations,
  };
}

