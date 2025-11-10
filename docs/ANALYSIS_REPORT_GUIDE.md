# 分析报告功能使用指南

## 📊 功能概览

分析报告模块是供应链金融系统的核心功能之一，提供企业信用、风险、财务、供应链等多维度的智能分析和可视化展示。

## 🎨 核心可视化组件

### 1. 综合信用评分仪表盘 (CreditScoreGauge)

**功能特点：**
- 🎯 **主仪表盘**：动态Gauge图表，实时展示0-1000分的信用评分
- 📊 **分项雷达图**：展示5个维度的信用评分细分
  - 还款历史（0-200分）
  - 债务负担（0-200分）
  - 经营稳定性（0-200分）
  - 行业地位（0-200分）
  - 供应链健康度（0-200分）
- 📈 **趋势指标**：显示相比上期的分数变化
- 🏆 **等级标签**：优秀/良好/中等/较差/差

**视觉效果：**
- 渐变色仪表盘（从红色到绿色）
- 3D阴影和发光效果
- 平滑动画（2s弹性缓动）
- 响应式雷达图

---

### 2. 多维风险分析旭日图 (RiskAnalysisSunburst)

**功能特点：**
- 🌅 **旭日图可视化**：分层展示企业风险结构
  - 第1层：企业总风险
  - 第2层：财务风险、经营风险、供应链风险、信用风险
  - 第3层：细分风险类别
- 📌 **风险统计卡片**：高/中/低风险数量统计
- ⚠️ **重点风险提示**：显示前3个重要风险及改进建议

**视觉效果：**
- 动态颜色映射（根据风险等级）
- 悬停高亮关联节点
- 圆角扇形设计
- 文字自动缩略

---

### 3. 供应链资金流向桑基图 (CashFlowSankey)

**功能特点：**
- 💰 **资金流向可视化**：展示供应商→企业→客户的资金流
- 📊 **资金统计**：
  - 总流入
  - 总流出
  - 净现金流
- 👥 **主要合作伙伴**：
  - 前3大供应商占比
  - 前3大客户占比

**视觉效果：**
- 渐变色流线
- 曲线连接（curveness: 0.5）
- 节点阴影效果
- 动态宽度表示资金量

---

### 4. 交易与还款趋势图 (TransactionRepaymentChart)

**功能特点：**
- 📈 **交易趋势**：
  - 交易笔数（柱状图）
  - 交易金额（面积图）
- ✅ **还款履约**：按时还款率曲线
- 📊 **统计指标**：
  - 总交易笔数和金额
  - 平均交易金额
  - 按时还款率
  - 平均逾期天数

**视觉效果：**
- 渐变柱状图（蓝紫色）
- 平滑曲线（粉色和绿色）
- 双Y轴设计
- 交叉指示器

---

### 5. 行业对比分析图 (IndustryBenchmarkChart)

**功能特点：**
- 🎯 **散点图对比**：企业在行业中的位置
  - X轴：信用评分
  - Y轴：营收规模
  - 特殊标记：当前企业（红色放大）
- 📊 **关键指标对比**：
  - 信用评分 vs 行业平均
  - 营收规模 vs 行业平均
  - 利润率 vs 行业平均
  - 供应链效率 vs 行业平均
- 🏆 **排名展示**：信用评分、营收、利润率排名

**视觉效果：**
- 彩色指标卡片
- 散点图动态标记
- 行业平均线对比

---

### 6. AI智能分析与预警 (AIAnalysisPanel)

**功能特点：**
- 🎓 **综合评价**：
  - 企业评级（优秀/良好/一般/较差）
  - 总结性评价
  - SWOT分析（优势/劣势/机会/威胁）
- ⚠️ **风险预警**：
  - 高/中/低风险预警
  - 影响范围分析
  - 建议措施
  - 处理截止时间
- 💡 **业务建议**：
  - 优先级排序
  - 预期影响
  - 实施难度
  - 预估成本
- 🔍 **AI洞察**：
  - 警告类洞察
  - 机会类洞察
  - 建议类洞察
  - 分析类洞察

**视觉效果：**
- 分类Alert展示
- 时间线布局
- 优先级颜色标记
- 可折叠详情

---

## 🗂️ 数据模型

### TimeRange（时间范围）
```typescript
enum TimeRange {
  MONTH = 'month',     // 本月
  QUARTER = 'quarter', // 本季度
  YEAR = 'year',       // 本年度
  ALL = 'all',         // 全部
}
```

### 核心数据结构

#### CreditScore（综合信用评分）
```typescript
{
  score: number;              // 0-1000
  level: 'excellent' | 'good' | 'medium' | 'poor' | 'bad';
  levelLabel: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  breakdown: {
    paymentHistory: number;
    debtBurden: number;
    businessStability: number;
    industryStatus: number;
    supplyChainHealth: number;
  };
  history: Array<{ date: string; score: number }>;
}
```

#### RiskAnalysis（风险分析）
```typescript
{
  riskTree: RiskNode[];        // 旭日图数据
  summary: {
    totalRiskPoints: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
  };
  riskDetails: Array<{
    category: string;
    subcategory: string;
    level: 'high' | 'medium' | 'low';
    description: string;
    suggestion: string;
  }>;
}
```

#### SupplyChainCashFlow（供应链资金流向）
```typescript
{
  nodes: Array<{ name: string }>;
  links: Array<{
    source: string;
    target: string;
    value: number;  // 万元
  }>;
  summary: {
    totalInflow: number;
    totalOutflow: number;
    netCashFlow: number;
    majorSuppliers: Array<{...}>;
    majorCustomers: Array<{...}>;
  };
}
```

---

## 📡 API接口

### 获取企业列表
```typescript
GET /api/analysis-report/enterprises
Response: { enterprises: EnterpriseListItem[] }
```

### 获取综合信用评分
```typescript
GET /api/analysis-report/credit-score
Params: { enterpriseId: string, timeRange: TimeRange }
Response: { data: CreditScore }
```

### 获取多维风险分析
```typescript
GET /api/analysis-report/risk-analysis
Params: { enterpriseId: string, timeRange: TimeRange }
Response: { data: RiskAnalysis }
```

### 获取供应链资金流向
```typescript
GET /api/analysis-report/supply-chain-cash-flow
Params: { enterpriseId: string, timeRange: TimeRange }
Response: { data: SupplyChainCashFlow }
```

### 获取交易与还款趋势
```typescript
GET /api/analysis-report/transaction-repayment-trend
Params: { enterpriseId: string, timeRange: TimeRange }
Response: { data: TransactionRepaymentTrend }
```

### 获取行业对比分析
```typescript
GET /api/analysis-report/industry-benchmark
Params: { enterpriseId: string, timeRange: TimeRange }
Response: { data: IndustryBenchmark }
```

### 获取AI智能分析
```typescript
GET /api/analysis-report/ai-analysis
Params: { enterpriseId: string, timeRange: TimeRange }
Response: { data: AIAnalysis }
```

---

## 🎯 使用场景

### 1. 企业自查
企业可以查看自身的信用评分、风险分析、财务健康等指标，了解自身在行业中的位置，发现潜在风险和改进机会。

### 2. 金融机构风控
金融机构可以通过综合分析报告，评估企业的信用状况、还款能力、供应链稳定性等，做出融资决策。

### 3. 供应链管理
企业可以通过资金流向图，了解供应链上下游的资金流动情况，优化供应链协同效率。

### 4. 投资决策
投资者可以通过行业对比分析，了解企业在行业中的竞争力和成长潜力。

---

## 🖨️ 导出与打印

### 打印功能
点击"打印报告"按钮，系统会自动调用浏览器打印功能，提供打印友好的样式：
- 隐藏导航栏、侧边栏、按钮等非内容元素
- 优化卡片样式，去除阴影
- 确保图表清晰显示
- 避免页面内元素被分页截断
- 保持颜色准确显示

### 导出PDF（TODO）
未来将支持一键导出为PDF格式，便于分享和存档。

---

## 🎨 设计亮点

### 1. 视觉冲击力
- **炫酷图表**：使用ECharts高级图表类型（Gauge、Sunburst、Sankey）
- **渐变色系**：采用现代化的渐变色和阴影效果
- **动画效果**：平滑的过渡动画和数据更新动画
- **3D效果**：仪表盘指针、卡片阴影等3D视觉效果

### 2. 信息密度
- **分层展示**：从综合评分到细分维度，层层递进
- **多维对比**：时间维度、行业对比、历史趋势等多角度分析
- **智能洞察**：AI自动生成分析报告和建议

### 3. 交互体验
- **实时筛选**：企业切换和时间范围切换，数据实时更新
- **悬停提示**：丰富的tooltip信息展示
- **响应式设计**：适配不同屏幕尺寸
- **加载反馈**：清晰的加载状态指示

---

## 📚 技术栈

- **React 19** + TypeScript
- **Ant Design 5** - UI组件库
- **Apache ECharts** - 数据可视化
- **echarts-for-react** - React集成
- **ahooks** - React Hooks工具
- **Tailwind CSS** - 样式框架
- **MSW** - API Mock

---

## 🚀 未来规划

1. **导出PDF功能**：集成pdf-lib或jsPDF实现PDF导出
2. **报告定制**：允许用户自定义报告内容和布局
3. **报告订阅**：定期生成并推送分析报告
4. **对比分析**：支持多个企业或多个时间段的对比分析
5. **历史报告**：查看和下载历史生成的报告
6. **分享功能**：生成分享链接，便于外部查看
7. **数据导出**：支持导出原始数据为Excel/CSV格式

---

## 📝 更新日志

### 2025-11-10
- ✅ 创建分析报告完整功能
- ✅ 实现6大核心可视化组件
- ✅ 集成Mock数据和API接口
- ✅ 添加打印样式支持
- ✅ 完善交互和动画效果

---

## 🤝 贡献指南

如需新增功能或修改，请遵循以下步骤：
1. 在`src/types/analysisReport.ts`中定义TypeScript类型
2. 在`src/api/analysisReport.ts`中添加API接口
3. 在`src/mocks/data/analysisReport.json`中准备Mock数据
4. 在`src/mocks/handlers/analysisReport.ts`中添加Handler
5. 在`src/pages/AnalysisReport/components/`中创建组件
6. 在主页面`src/pages/AnalysisReport/index.tsx`中集成

---

**祝您使用愉快！** 🎉

