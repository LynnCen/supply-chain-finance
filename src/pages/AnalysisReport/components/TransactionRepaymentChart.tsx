/**
 * 交易与还款趋势分析组件
 */
import React, { useRef } from 'react';
import { Row, Col, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ECharts } from 'echarts';
import { LineChartOutlined, CheckCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { TransactionRepaymentTrend } from '@/types/analysisReport';
import {
  THEME_COLORS,
  LINE_THEME,
  COMMON_CHART_CONFIG,
  ANIMATION_CONFIG,
  DATA_ZOOM_CONFIG,
} from '../config/chartTheme';
import ChartCard from './ChartCard';
import { useChartResize } from '../hooks/useChartResize';
import { formatPercent } from '../utils/chartUtils';

interface TransactionRepaymentChartProps {
  data?: TransactionRepaymentTrend;
  loading?: boolean;
}

const TransactionRepaymentChart: React.FC<TransactionRepaymentChartProps> = ({
  data,
  loading = false,
}) => {
  const chartRef = useRef<ECharts | null>(null);
  useChartResize(chartRef);

  const getOption = (): EChartsOption => {
    if (!data) return {};

    const dates = data.transactionTrend.map(item => item.date);
    const transactionCounts = data.transactionTrend.map(item => item.count);
    const transactionAmounts = data.transactionTrend.map(item => item.amount);
    const onTimeRates = data.repaymentTrend.map(item => item.onTimeRate);

    return {
      ...COMMON_CHART_CONFIG,
      ...ANIMATION_CONFIG,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
          lineStyle: {
            type: 'dashed',
            color: 'rgba(88, 143, 249, 0.5)',
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 0,
        borderRadius: 12,
        padding: [12, 16],
        textStyle: {
          color: '#2d3748',
          fontSize: 13,
        },
        extraCssText: 'box-shadow: 0 10px 40px rgba(0,0,0,0.1); backdrop-filter: blur(10px);',
      },
      legend: {
        data: ['交易笔数', '交易金额', '按时还款率'],
        top: 10,
        textStyle: {
          fontSize: 13,
          color: '#4a5568',
        },
        icon: 'roundRect',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 20,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '12%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          fontSize: 11,
          color: '#4a5568',
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0',
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '笔数/金额(万)',
          nameTextStyle: {
            fontSize: 12,
            color: '#4a5568',
          },
          axisLabel: {
            fontSize: 11,
            color: '#4a5568',
          },
          splitLine: {
            lineStyle: {
              color: '#e2e8f0',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: '还款率(%)',
          min: 85,
          max: 100,
          nameTextStyle: {
            fontSize: 12,
            color: '#4a5568',
          },
          axisLabel: {
            formatter: '{value}%',
            fontSize: 11,
            color: '#4a5568',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      dataZoom: [
        {
          ...DATA_ZOOM_CONFIG,
          start: dates.length > 10 ? 50 : 0,
          end: 100,
        },
      ],
      series: [
        {
          name: '交易笔数',
          type: 'bar',
          data: transactionCounts,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: THEME_COLORS.primary[0] },
                { offset: 1, color: `${THEME_COLORS.primary[0]}80` },
              ],
            },
            borderRadius: [4, 4, 0, 0],
            shadowBlur: 8,
            shadowColor: 'rgba(88, 143, 249, 0.3)',
            shadowOffsetY: 2,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowColor: 'rgba(88, 143, 249, 0.5)',
            },
          },
        },
        {
          name: '交易金额',
          type: 'line',
          data: transactionAmounts,
          ...LINE_THEME,
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: THEME_COLORS.primary[1] },
                { offset: 1, color: THEME_COLORS.primary[5] },
              ],
            },
            shadowColor: 'rgba(90, 216, 166, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 3,
          },
          itemStyle: {
            color: THEME_COLORS.primary[1],
            borderColor: '#fff',
            borderWidth: 2,
            shadowBlur: 5,
            shadowColor: 'rgba(90, 216, 166, 0.4)',
          },
          areaStyle: {
            opacity: 0.25,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: `${THEME_COLORS.primary[1]}50` },
                { offset: 1, color: `${THEME_COLORS.primary[1]}08` },
              ],
            },
          },
        },
        {
          name: '按时还款率',
          type: 'line',
          yAxisIndex: 1,
          data: onTimeRates,
          ...LINE_THEME,
          lineStyle: {
            width: 3,
            color: THEME_COLORS.primary[4],
            shadowColor: 'rgba(111, 94, 249, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 3,
          },
          itemStyle: {
            color: THEME_COLORS.primary[4],
            borderColor: '#fff',
            borderWidth: 2,
            shadowBlur: 5,
            shadowColor: 'rgba(111, 94, 249, 0.4)',
          },
        },
      ],
    };
  };

  const { summary } = data || {};

  return (
    <ChartCard
      title={
        <div className="tw-flex tw-items-center">
          <LineChartOutlined className="tw-text-blue-500 tw-text-xl tw-mr-2" />
          <span>交易与还款趋势</span>
        </div>
      }
      subtitle="追踪企业交易活跃度与还款履约情况"
      loading={loading}
      empty={!data}
      info="支持鼠标滚轮缩放查看不同时间段的数据"
      height={600}
      hoverable
    >
      <div className="tw-space-y-6">
        {/* 摘要统计 */}
        {summary && (
          <Row gutter={[12, 12]}>
            <Col xs={12}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-blue-200 tw-shadow-sm">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">累计交易</span>}
                  value={summary.totalTransactions}
                  suffix="笔"
                  prefix={<ShoppingOutlined />}
                  valueStyle={{
                    color: THEME_COLORS.primary[0],
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-green-200 tw-shadow-sm">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">平均还款率</span>}
                  value={summary.avgOnTimeRate}
                  suffix="%"
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{
                    color: THEME_COLORS.financial.profit,
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                  precision={1}
                />
              </div>
            </Col>
          </Row>
        )}

        {/* 趋势图 */}
        <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
          <div className="tw-h-[380px]">
          <ReactECharts
            ref={(e: any) => {
              if (e) chartRef.current = e.getEchartsInstance();
            }}
            option={getOption()}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
          </div>
        </div>
      </div>
    </ChartCard>
  );
};

export default TransactionRepaymentChart;
