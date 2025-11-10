/**
 * 分析报告图表主题配置
 * 现代化金融数据可视化主题
 */

// 主题配色方案
export const THEME_COLORS = {
  // 主色系 - 蓝紫渐变
  primary: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#6F5EF9', '#6DC8EC', '#945FB9', '#FF9845'],
  
  // 信用等级配色
  credit: {
    excellent: '#52c41a', // 优秀 - 绿色
    good: '#73d13d',      // 良好 - 浅绿
    medium: '#faad14',    // 中等 - 橙色
    poor: '#ff7a45',      // 较差 - 橙红
    bad: '#ff4d4f',       // 差 - 红色
  },
  
  // 风险等级配色
  risk: {
    critical: '#cf1322', // 严重 - 深红
    high: '#ff4d4f',     // 高 - 红色
    medium: '#faad14',   // 中 - 橙色
    low: '#52c41a',      // 低 - 绿色
  },
  
  // 渐变色系
  gradients: {
    // 蓝紫渐变
    bluePurple: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#667eea' },
        { offset: 1, color: '#764ba2' },
      ],
    },
    // 蓝绿渐变
    blueGreen: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#00d2ff' },
        { offset: 1, color: '#3a7bd5' },
      ],
    },
    // 金色渐变
    gold: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#FFD700' },
        { offset: 1, color: '#FFA500' },
      ],
    },
    // 紫粉渐变
    purplePink: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#ee0979' },
        { offset: 1, color: '#ff6a00' },
      ],
    },
  },
  
  // 金融数据配色
  financial: {
    profit: '#52c41a',   // 盈利 - 绿色
    loss: '#ff4d4f',     // 亏损 - 红色
    neutral: '#1890ff',  // 中性 - 蓝色
    warning: '#faad14',  // 警告 - 橙色
  },
};

// 通用图表配置
export const COMMON_CHART_CONFIG = {
  // 背景透明
  backgroundColor: 'transparent',
  
  // 文字样式
  textStyle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 13,
    color: '#4a5568',
  },
  
  // 网格配置
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '10%',
    containLabel: true,
  },
  
  // 工具提示配置
  tooltip: {
    trigger: 'axis' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 0,
    borderRadius: 12,
    padding: [12, 16],
    textStyle: {
      color: '#2d3748',
      fontSize: 13,
    },
    extraCssText: 'box-shadow: 0 10px 40px rgba(0,0,0,0.08); backdrop-filter: blur(10px);',
    axisPointer: {
      type: 'cross' as const,
      crossStyle: {
        color: '#999',
      },
      lineStyle: {
        color: 'rgba(88, 143, 249, 0.3)',
        type: 'dashed' as const,
      },
    },
  },
  
  // 图例配置
  legend: {
    textStyle: {
      fontSize: 13,
      color: '#4a5568',
    },
    icon: 'roundRect',
    itemWidth: 14,
    itemHeight: 14,
    itemGap: 16,
  },
};

// 数据缩放配置（通用）
export const DATA_ZOOM_CONFIG = {
  show: true,
  type: 'inside' as const,
  filterMode: 'none' as const,
  xAxisIndex: [0],
  start: 0,
  end: 100,
};

// 工具箱配置（通用）
export const TOOLBOX_CONFIG = {
  feature: {
    saveAsImage: {
      show: true,
      title: '保存为图片',
      pixelRatio: 2,
      backgroundColor: '#fff',
    },
    dataZoom: {
      show: true,
      title: {
        zoom: '区域缩放',
        back: '还原',
      },
    },
    restore: {
      show: true,
      title: '还原',
    },
  },
  iconStyle: {
    borderColor: '#4a5568',
  },
  emphasis: {
    iconStyle: {
      borderColor: '#1890ff',
    },
  },
};

// 仪表盘主题配置
export const GAUGE_THEME = {
  // 仪表盘渐变色
  colorGradient: [
    { color: '#ff4d4f', offset: 0 },      // 0-400: 红色
    { color: '#faad14', offset: 0.4 },    // 400-600: 橙色
    { color: '#52c41a', offset: 0.6 },    // 600-800: 绿色
    { color: '#1890ff', offset: 1 },      // 800-1000: 蓝色
  ],
  
  // 指针样式
  pointer: {
    width: 5,
    length: '70%',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(88, 143, 249, 1)' },
          { offset: 1, color: 'rgba(88, 143, 249, 0.3)' },
        ],
      },
      shadowColor: 'rgba(88, 143, 249, 0.5)',
      shadowBlur: 10,
      shadowOffsetY: 2,
    },
  },
  
  // 轴线样式
  axisLine: {
    lineStyle: {
      width: 30,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      shadowOffsetY: 2,
    },
  },
  
  // 刻度样式
  axisTick: {
    distance: -30,
    length: 8,
    lineStyle: {
      color: '#fff',
      width: 2,
    },
  },
  
  // 分割线样式
  splitLine: {
    distance: -30,
    length: 15,
    lineStyle: {
      color: '#fff',
      width: 3,
    },
  },
  
  // 标签样式
  axisLabel: {
    distance: -60,
    color: '#4a5568',
    fontSize: 12,
    fontWeight: 'bold',
    formatter: (value: number) => value,
  },
  
  // 详情样式
  detail: {
    valueAnimation: true,
    formatter: '{value}',
    color: '#2d3748',
    fontSize: 40,
    fontWeight: 'bold',
    offsetCenter: [0, '50%'],
  },
  
  // 标题样式
  title: {
    offsetCenter: [0, '75%'],
    fontSize: 16,
    color: '#4a5568',
  },
};

// 旭日图主题配置
export const SUNBURST_THEME = {
  // 颜色配置
  colorBy: 'name' as const,
  
  // 圆环配置
  radius: ['15%', '80%'],
  
  // 标签配置
  label: {
    show: true,
    rotate: 'radial',
    color: '#fff',
    fontSize: 12,
    fontWeight: 500,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowBlur: 3,
    formatter: (params: any) => {
      if (params.data.value && params.data.value > 10) {
        return params.name;
      }
      return '';
    },
  },
  
  // 样式配置
  itemStyle: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowBlur: 10,
  },
  
  // 高亮样式
  emphasis: {
    focus: 'ancestor' as const,
    itemStyle: {
      shadowBlur: 20,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
};

// 桑基图主题配置
export const SANKEY_THEME = {
  // 节点样式
  nodeWidth: 30,
  nodeGap: 12,
  
  // 线条样式
  lineStyle: {
    color: 'gradient',
    curveness: 0.5,
    opacity: 0.5,
  },
  
  // 标签样式
  label: {
    color: '#4a5568',
    fontSize: 12,
    fontWeight: 500,
  },
  
  // 节点样式
  itemStyle: {
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    shadowOffsetY: 2,
  },
  
  // 高亮样式
  emphasis: {
    focus: 'adjacency' as const,
    lineStyle: {
      opacity: 0.8,
      width: 3,
    },
    itemStyle: {
      shadowBlur: 15,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
};

// 折线图主题配置
export const LINE_THEME = {
  // 线条样式
  lineStyle: {
    width: 3,
    shadowColor: 'rgba(88, 143, 249, 0.3)',
    shadowBlur: 10,
    shadowOffsetY: 5,
  },
  
  // 区域样式
  areaStyle: {
    opacity: 0.3,
  },
  
  // 平滑曲线
  smooth: true,
  
  // 符号配置
  symbol: 'circle',
  symbolSize: 8,
  
  // 高亮样式
  emphasis: {
    focus: 'series' as const,
    lineStyle: {
      width: 4,
    },
    itemStyle: {
      borderWidth: 2,
      borderColor: '#fff',
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
};

// 柱状图主题配置
export const BAR_THEME = {
  // 柱体样式
  barMaxWidth: 40,
  barGap: '30%',
  barCategoryGap: '40%',
  
  // 渐变填充
  itemStyle: {
    borderRadius: [8, 8, 0, 0],
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    shadowOffsetY: 5,
  },
  
  // 高亮样式
  emphasis: {
    itemStyle: {
      shadowBlur: 15,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
};

// 散点图主题配置
export const SCATTER_THEME = {
  // 符号配置
  symbol: 'circle',
  symbolSize: (val: number[]) => Math.sqrt(val[2]) * 2,
  
  // 样式配置
  itemStyle: {
    opacity: 0.75,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowBlur: 10,
  },
  
  // 高亮样式
  emphasis: {
    scale: 1.2,
    itemStyle: {
      opacity: 1,
      shadowBlur: 15,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  
  // 标签样式
  label: {
    show: false,
    position: 'top',
    formatter: '{b}',
    fontSize: 11,
    color: '#4a5568',
  },
};

// 动画配置
export const ANIMATION_CONFIG = {
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut' as const,
  animationDelay: (idx: number) => idx * 50,
};

// 导出所有配置
export default {
  THEME_COLORS,
  COMMON_CHART_CONFIG,
  DATA_ZOOM_CONFIG,
  TOOLBOX_CONFIG,
  GAUGE_THEME,
  SUNBURST_THEME,
  SANKEY_THEME,
  LINE_THEME,
  BAR_THEME,
  SCATTER_THEME,
  ANIMATION_CONFIG,
};

