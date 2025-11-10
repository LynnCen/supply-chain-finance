/**
 * 图表工具函数
 * 提供数据格式化、配置生成等工具函数
 */

/**
 * 格式化金额
 */
export const formatCurrency = (value: number, unit: string = '元'): string => {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(2)}亿${unit}`;
  }
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)}万${unit}`;
  }
  return `${value.toFixed(2)}${unit}`;
};

/**
 * 格式化百分比
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * 格式化日期
 */
export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
};

/**
 * 生成Tooltip格式化函数
 */
export const createTooltipFormatter = (config: {
  title?: string;
  valueFormatter?: (value: number) => string;
  multiSeries?: boolean;
}) => {
  return (params: any) => {
    if (Array.isArray(params)) {
      const title = config.title || params[0].axisValueLabel;
      let content = `<div style="font-weight: 600; margin-bottom: 8px;">${title}</div>`;
      
      params.forEach((item: any) => {
        const value = config.valueFormatter 
          ? config.valueFormatter(item.value) 
          : item.value;
        content += `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
            <span style="display: flex; align-items: center;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${item.color}; margin-right: 8px;"></span>
              ${item.seriesName}
            </span>
            <span style="font-weight: 600; margin-left: 16px;">${value}</span>
          </div>
        `;
      });
      
      return content;
    } else {
      const title = config.title || params.name;
      const value = config.valueFormatter 
        ? config.valueFormatter(params.value) 
        : params.value;
      
      return `
        <div>
          <div style="font-weight: 600; margin-bottom: 8px;">${title}</div>
          <div style="display: flex; align-items: center;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${params.color}; margin-right: 8px;"></span>
            <span style="font-weight: 600;">${value}</span>
          </div>
        </div>
      `;
    }
  };
};

/**
 * 生成渐变色
 */
export const createGradientColor = (colors: string[], direction: 'vertical' | 'horizontal' = 'vertical') => {
  const isVertical = direction === 'vertical';
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: isVertical ? 0 : 1,
    y2: isVertical ? 1 : 0,
    colorStops: colors.map((color, index) => ({
      offset: index / (colors.length - 1),
      color,
    })),
  };
};

/**
 * 生成阴影配置
 */
export const createShadow = (color: string = 'rgba(0, 0, 0, 0.1)', blur: number = 10) => {
  return {
    shadowColor: color,
    shadowBlur: blur,
    shadowOffsetY: 2,
  };
};

/**
 * 根据值获取颜色
 */
export const getColorByValue = (value: number, thresholds: { value: number; color: string }[]) => {
  const sorted = [...thresholds].sort((a, b) => a.value - b.value);
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (value >= sorted[i].value) {
      return sorted[i].color;
    }
  }
  return sorted[0].color;
};

/**
 * 计算趋势
 */
export const calculateTrend = (current: number, previous: number): {
  value: number;
  percent: number;
  direction: 'up' | 'down' | 'stable';
} => {
  const diff = current - previous;
  const percent = previous === 0 ? 0 : (diff / previous) * 100;
  
  let direction: 'up' | 'down' | 'stable' = 'stable';
  if (Math.abs(percent) > 0.5) {
    direction = percent > 0 ? 'up' : 'down';
  }
  
  return {
    value: diff,
    percent,
    direction,
  };
};

/**
 * 生成响应式网格配置
 */
export const getResponsiveGrid = (breakpoint: string) => {
  const configs: Record<string, any> = {
    xs: { left: '5%', right: '5%', top: '15%', bottom: '10%' },
    sm: { left: '4%', right: '4%', top: '12%', bottom: '8%' },
    md: { left: '3%', right: '4%', top: '10%', bottom: '6%' },
    lg: { left: '3%', right: '4%', top: '10%', bottom: '5%' },
    xl: { left: '3%', right: '4%', top: '10%', bottom: '5%' },
    xxl: { left: '3%', right: '4%', top: '10%', bottom: '5%' },
  };
  return configs[breakpoint] || configs.md;
};

/**
 * 数据排序
 */
export const sortData = <T>(data: T[], key: keyof T, order: 'asc' | 'desc' = 'desc'): T[] => {
  return [...data].sort((a, b) => {
    const aVal = a[key] as any;
    const bVal = b[key] as any;
    
    if (order === 'asc') {
      return aVal - bVal;
    } else {
      return bVal - aVal;
    }
  });
};

/**
 * 数据分组
 */
export const groupData = <T>(data: T[], key: keyof T): Record<string, T[]> => {
  return data.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

/**
 * 生成图例选择器配置
 */
export const createLegendSelector = (data: string[]) => {
  const selected: Record<string, boolean> = {};
  data.forEach(name => {
    selected[name] = true;
  });
  return selected;
};

export default {
  formatCurrency,
  formatPercent,
  formatDate,
  createTooltipFormatter,
  createGradientColor,
  createShadow,
  getColorByValue,
  calculateTrend,
  getResponsiveGrid,
  sortData,
  groupData,
  createLegendSelector,
};

