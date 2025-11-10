/**
 * 图表响应式调整 Hook
 * 监听窗口大小变化，自动调整图表尺寸
 */
import { useEffect, useRef } from 'react';
import type { ECharts } from 'echarts';

/**
 * 响应式断点
 */
export const CHART_BREAKPOINTS = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

/**
 * 获取当前屏幕断点
 */
export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  if (width < CHART_BREAKPOINTS.sm) return 'xs';
  if (width < CHART_BREAKPOINTS.md) return 'sm';
  if (width < CHART_BREAKPOINTS.lg) return 'md';
  if (width < CHART_BREAKPOINTS.xl) return 'lg';
  if (width < CHART_BREAKPOINTS.xxl) return 'xl';
  return 'xxl';
};

/**
 * 根据断点获取图表配置
 */
export const getResponsiveConfig = (breakpoint: string) => {
  const configs = {
    xs: {
      fontSize: 10,
      titleFontSize: 14,
      legendItemWidth: 15,
      legendItemHeight: 10,
      padding: 10,
    },
    sm: {
      fontSize: 11,
      titleFontSize: 15,
      legendItemWidth: 18,
      legendItemHeight: 12,
      padding: 15,
    },
    md: {
      fontSize: 12,
      titleFontSize: 16,
      legendItemWidth: 20,
      legendItemHeight: 14,
      padding: 20,
    },
    lg: {
      fontSize: 13,
      titleFontSize: 18,
      legendItemWidth: 22,
      legendItemHeight: 14,
      padding: 20,
    },
    xl: {
      fontSize: 14,
      titleFontSize: 20,
      legendItemWidth: 25,
      legendItemHeight: 14,
      padding: 20,
    },
    xxl: {
      fontSize: 14,
      titleFontSize: 20,
      legendItemWidth: 25,
      legendItemHeight: 14,
      padding: 20,
    },
  };
  return configs[breakpoint as keyof typeof configs] || configs.md;
};

/**
 * 图表自动调整尺寸 Hook
 */
export const useChartResize = (chartRef: React.MutableRefObject<ECharts | null>) => {
  const resizeTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleResize = () => {
      // 防抖处理
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = setTimeout(() => {
        if (chartRef.current) {
          chartRef.current.resize();
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [chartRef]);
};

export default useChartResize;

