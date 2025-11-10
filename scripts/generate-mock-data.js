/**
 * 生成完整的分析报告 Mock 数据
 * 为所有企业（E001、E002、E003）和所有时间范围（month、quarter、year、all）生成数据
 */
const fs = require('fs');
const path = require('path');

// 读取现有的 mock 数据作为模板
const mockDataPath = path.join(__dirname, '../src/mocks/data/analysisReport.json');
const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

// 企业配置
const ENTERPRISE_CONFIG = {
  E001: { name: '华夏供应链科技有限公司', creditRating: 'AAA', scoreMultiplier: 1.0 },
  E002: { name: '东方物流集团', creditRating: 'AA', scoreMultiplier: 0.85 },
  E003: { name: '盛世贸易有限公司', creditRating: 'A', scoreMultiplier: 0.72 },
};

const enterprises = ['E001', 'E002', 'E003'];
const timeRanges = ['month', 'quarter', 'year', 'all'];

/**
 * 获取企业配置
 */
function getEnterpriseConfig(enterpriseId) {
  return ENTERPRISE_CONFIG[enterpriseId] || ENTERPRISE_CONFIG.E001;
}

/**
 * 获取基础数据
 */
function getBaseData(dataSource, enterpriseId, timeRange) {
  const enterpriseData = dataSource[enterpriseId];
  if (enterpriseData?.[timeRange]) {
    return enterpriseData[timeRange];
  }
  if (dataSource.E001?.[timeRange]) {
    return dataSource.E001[timeRange];
  }
  return dataSource.E001?.month || null;
}

/**
 * 计算信用等级
 */
function getCreditLevel(score) {
  if (score >= 850) return { level: 'excellent', levelLabel: '优秀' };
  if (score >= 750) return { level: 'good', levelLabel: '良好' };
  if (score >= 650) return { level: 'medium', levelLabel: '中等' };
  if (score >= 550) return { level: 'poor', levelLabel: '较差' };
  return { level: 'bad', levelLabel: '差' };
}

/**
 * 生成信用评分数据
 */
function generateCreditScore(enterpriseId, timeRange) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.creditScore, enterpriseId, timeRange);

  if (!baseData) return null;

  const score = Math.max(300, Math.min(1000, Math.round(baseData.score * config.scoreMultiplier)));
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
      businessStability: Math.round(baseData.breakdown.businessStability * config.scoreMultiplier),
      industryStatus: Math.round(baseData.breakdown.industryStatus * config.scoreMultiplier),
      supplyChainHealth: Math.round(baseData.breakdown.supplyChainHealth * config.scoreMultiplier),
    },
    history: baseData.history.map(h => ({
      ...h,
      score: Math.round(h.score * config.scoreMultiplier),
    })),
  };
}

/**
 * 生成风险分析数据
 */
function generateRiskAnalysis(enterpriseId, timeRange) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.riskAnalysis, enterpriseId, timeRange);

  if (!baseData) return null;

  const riskMultiplier = 2.0 - config.scoreMultiplier;

  const processRiskNode = (node) => {
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
      lowRiskCount: Math.max(1, Math.floor(baseData.summary.lowRiskCount / riskMultiplier)),
    },
    riskDetails: baseData.riskDetails,
  };
}

/**
 * 生成供应链资金流向数据
 */
function generateCashFlow(enterpriseId, timeRange) {
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
 * 生成交易还款趋势数据
 */
function generateTransactionTrend(enterpriseId, timeRange) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.transactionRepaymentTrend, enterpriseId, timeRange);

  if (!baseData) return null;

  const multiplier = config.scoreMultiplier;
  const repaymentQuality = Math.min(1.0, config.scoreMultiplier * 0.98);

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
      avgTransactionAmount: Math.round(baseData.summary.avgTransactionAmount * multiplier * 100) / 100,
      totalRepayments: Math.round(baseData.summary.totalRepayments * multiplier),
      onTimeRepaymentRate: Math.min(100, Math.round(baseData.summary.onTimeRepaymentRate * repaymentQuality * 100) / 100),
      avgRepaymentDelay: Math.round(baseData.summary.avgRepaymentDelay * (2 - repaymentQuality) * 100) / 100,
    },
  };
}

/**
 * 生成行业对比数据
 */
function generateBenchmark(enterpriseId, timeRange) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.industryBenchmark, enterpriseId, timeRange);

  if (!baseData) return null;

  const multiplier = config.scoreMultiplier;
  const rankMultiplier = 2.0 - multiplier;

  return {
    currentEnterprise: {
      name: config.name,
      creditScore: Math.round(baseData.currentEnterprise.creditScore * multiplier),
      revenue: Math.round(baseData.currentEnterprise.revenue * multiplier),
      profitMargin: Math.round(baseData.currentEnterprise.profitMargin * multiplier * 100) / 100,
      debtRatio: Math.round(baseData.currentEnterprise.debtRatio * (1 + (1 - multiplier) * 0.3) * 100) / 100,
      turnoverRate: Math.round(baseData.currentEnterprise.turnoverRate * multiplier * 100) / 100,
      supplyChainEfficiency: Math.round(baseData.currentEnterprise.supplyChainEfficiency * multiplier),
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
      creditScoreRank: Math.min(156, Math.ceil(8 * rankMultiplier)),
      revenueRank: Math.min(156, Math.ceil(8 * rankMultiplier)),
      profitMarginRank: Math.min(156, Math.ceil(12 * rankMultiplier)),
      totalEnterprises: 156,
    },
    ranking: baseData.ranking || {
      rank: Math.min(156, Math.ceil(8 * rankMultiplier)),
      percentile: Math.max(0, Math.round((1 - 8 * rankMultiplier / 156) * 1000) / 10),
    },
  };
}

/**
 * 生成 AI 分析数据
 */
function generateAIAnalysis(enterpriseId, timeRange) {
  const config = getEnterpriseConfig(enterpriseId);
  const baseData = getBaseData(mockData.aiAnalysis, enterpriseId, timeRange);

  if (!baseData) return null;

  return {
    overallAssessment: {
      ...baseData.overallAssessment,
      summary: baseData.overallAssessment.summary.replace(/华夏供应链科技有限公司|华夏供应链科技/g, config.name),
    },
    insights: baseData.insights.map(insight => ({
      ...insight,
      content: insight.content.replace(/华夏供应链科技有限公司|华夏供应链科技/g, config.name),
    })),
    warnings: baseData.warnings,
    recommendations: baseData.recommendations,
  };
}

// 生成完整数据
console.log('🚀 开始生成完整的 Mock 数据...\n');

const fullData = {
  enterpriseList: mockData.enterpriseList,
  creditScore: {},
  riskAnalysis: {},
  supplyChainCashFlow: {},
  transactionRepaymentTrend: {},
  industryBenchmark: {},
  aiAnalysis: {}
};

enterprises.forEach(enterpriseId => {
  console.log(`📊 正在生成 ${enterpriseId} (${ENTERPRISE_CONFIG[enterpriseId].name}) 的数据...`);
  
  fullData.creditScore[enterpriseId] = {};
  fullData.riskAnalysis[enterpriseId] = {};
  fullData.supplyChainCashFlow[enterpriseId] = {};
  fullData.transactionRepaymentTrend[enterpriseId] = {};
  fullData.industryBenchmark[enterpriseId] = {};
  fullData.aiAnalysis[enterpriseId] = {};
  
  timeRanges.forEach(timeRange => {
    console.log(`  ⏱️  ${timeRange}...`);
    fullData.creditScore[enterpriseId][timeRange] = generateCreditScore(enterpriseId, timeRange);
    fullData.riskAnalysis[enterpriseId][timeRange] = generateRiskAnalysis(enterpriseId, timeRange);
    fullData.supplyChainCashFlow[enterpriseId][timeRange] = generateCashFlow(enterpriseId, timeRange);
    fullData.transactionRepaymentTrend[enterpriseId][timeRange] = generateTransactionTrend(enterpriseId, timeRange);
    fullData.industryBenchmark[enterpriseId][timeRange] = generateBenchmark(enterpriseId, timeRange);
    fullData.aiAnalysis[enterpriseId][timeRange] = generateAIAnalysis(enterpriseId, timeRange);
  });
  
  console.log(`  ✅ ${enterpriseId} 数据生成完成\n`);
});

// 写入文件
const outputPath = path.join(__dirname, '../src/mocks/data/analysisReport.json');
fs.writeFileSync(outputPath, JSON.stringify(fullData, null, 2), 'utf8');

console.log('✨ 完整的 Mock 数据已生成并保存到:', outputPath);
console.log('\n📈 数据统计:');
console.log(`  - 企业数量: ${enterprises.length}`);
console.log(`  - 时间范围: ${timeRanges.length}`);
console.log(`  - 数据模块: 6 (信用评分、风险分析、资金流向、交易趋势、行业对比、AI分析)`);
console.log(`  - 总数据条目: ${enterprises.length * timeRanges.length * 6} 条\n`);

