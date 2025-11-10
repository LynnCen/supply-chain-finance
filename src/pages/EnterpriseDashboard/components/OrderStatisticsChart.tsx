import React from 'react';
import { Card, Empty, Skeleton, Row, Col, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { BarChartOutlined, RiseOutlined } from '@ant-design/icons';
import { OrderStatistics } from '@/types/enterpriseDashboard';

interface OrderStatisticsChartProps {
  data?: OrderStatistics;
  loading?: boolean;
}

const OrderStatisticsChart: React.FC<OrderStatisticsChartProps> = ({ data, loading = false }) => {
  const getOption = (): EChartsOption => {
    if (!data?.byType || data.byType.length === 0) {
      return {};
    }

    const types = data.byType.map(item => item.category);
    const counts = data.byType.map(item => item.count);
    const amounts = data.byType.map(item => item.amount);

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
          fontSize: 13,
        },
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(100, 100, 255, 0.15)',
          },
        },
        formatter: (params: unknown) => {
          const paramsArray = params as Array<{
            axisValue: string;
            seriesName: string;
            value: number;
          }>;

          let result = `<div style="padding: 12px; min-width: 180px;">`;
          result += `<div style="font-size: 14px; font-weight: bold; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.2);">${paramsArray[0].axisValue}</div>`;

          paramsArray.forEach((item, index) => {
            const color =
              index === 0
                ? 'linear-gradient(135deg, #667eea 0%, #a855f7 100%)'
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

            const textColor = index === 0 ? '#a855f7' : '#f5576c';

            result += `
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 12px; height: 12px; background: ${color}; border-radius: 3px; margin-right: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
                <span style="flex: 1;">${item.seriesName}:</span>
                <span style="font-weight: bold; margin-left: 12px; color: ${textColor};">
                  ${index === 0 ? item.value + ' 笔' : (item.value / 10000).toFixed(2) + ' 万元'}
                </span>
              </div>
            `;
          });

          result += `</div>`;
          return result;
        },
      },
      legend: {
        data: ['订单数量', '订单金额'],
        top: 8,
        right: 20,
        textStyle: {
          fontSize: 13,
          color: '#666',
        },
        itemWidth: 20,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        top: 55,
        left: 60,
        right: 60,
        bottom: 45,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: types,
        axisLine: {
          lineStyle: {
            color: '#e0e0e0',
            width: 2,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#666',
          fontSize: 11,
          fontWeight: 500,
          interval: 0,
          rotate: types.length > 5 ? 30 : 0,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '订单数量',
          nameTextStyle: {
            color: '#667eea',
            fontSize: 12,
            fontWeight: 'bold',
            padding: [0, 0, 0, 40],
          },
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#667eea',
              width: 2,
            },
          },
          axisLabel: {
            color: '#666',
            fontSize: 11,
            formatter: '{value} 笔',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(102, 126, 234, 0.08)',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: '订单金额',
          nameTextStyle: {
            color: '#f093fb',
            fontSize: 12,
            fontWeight: 'bold',
            padding: [0, 40, 0, 0],
          },
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f093fb',
              width: 2,
            },
          },
          axisLabel: {
            color: '#666',
            fontSize: 11,
            formatter: (value: number) => `${(value / 10000).toFixed(0)}万`,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '订单数量',
          type: 'bar',
          yAxisIndex: 0,
          data: counts,
          barWidth: '45%',
          barGap: '30%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#667eea' },
                { offset: 0.5, color: '#764ba2' },
                { offset: 1, color: '#a855f7' },
              ],
            },
            borderRadius: [12, 12, 0, 0],
            shadowBlur: 20,
            shadowColor: 'rgba(102, 126, 234, 0.6)',
            shadowOffsetX: 0,
            shadowOffsetY: 8,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 2,
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              shadowBlur: 30,
              shadowOffsetY: 12,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#5568d3' },
                  { offset: 0.5, color: '#6a3d8f' },
                  { offset: 1, color: '#9333ea' },
                ],
              },
            },
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c} 笔',
            color: '#667eea',
            fontSize: 11,
            fontWeight: 'bold',
            distance: 8,
          },
          backgroundStyle: {
            color: 'rgba(102, 126, 234, 0.03)',
            borderRadius: [12, 12, 0, 0],
          },
          showBackground: true,
          animationDelay: (idx: number) => idx * 80,
        },
        {
          name: '订单金额',
          type: 'line',
          yAxisIndex: 1,
          data: amounts,
          smooth: true,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: {
            width: 4,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#f093fb' },
                { offset: 0.5, color: '#f5576c' },
                { offset: 1, color: '#fa709a' },
              ],
            },
            shadowBlur: 20,
            shadowColor: 'rgba(240, 147, 251, 0.6)',
          },
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: '#fff' },
                { offset: 0.6, color: '#f5576c' },
                { offset: 1, color: '#f093fb' },
              ],
            },
            borderColor: '#fff',
            borderWidth: 3,
            shadowBlur: 15,
            shadowColor: 'rgba(245, 87, 108, 1)',
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              shadowBlur: 25,
              borderWidth: 4,
            },
            lineStyle: {
              width: 5,
              shadowBlur: 25,
            },
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params: { value?: number | string }) => {
              const value = typeof params.value === 'number' ? params.value : 0;
              return `${(value / 10000).toFixed(1)}万`;
            },
            color: '#f5576c',
            fontSize: 11,
            fontWeight: 'bold',
            distance: 12,
          } as any,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(240, 147, 251, 0.5)' },
                { offset: 0.5, color: 'rgba(245, 87, 108, 0.3)' },
                { offset: 1, color: 'rgba(250, 112, 154, 0.1)' },
              ],
            },
            shadowBlur: 25,
            shadowColor: 'rgba(240, 147, 251, 0.3)',
          },
          animationDelay: 500,
        },
      ],
      animationDuration: 2500,
      animationEasing: 'cubicOut',
    };
  };

  if (loading) {
    return (
      <Card
        className="tw-border tw-border-green-100 tw-shadow-sm tw-h-full"
        bodyStyle={{ padding: '16px' }}
        title={
          <div className="tw-flex tw-items-center">
            <BarChartOutlined className="tw-mr-2 tw-text-green-500" />
            <span>订单统计分析</span>
          </div>
        }
      >
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  return (
    <Card
      className="tw-border tw-border-green-100 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-bg-gradient-to-br tw-from-white tw-to-green-50/20 tw-h-full"
      bodyStyle={{ padding: '16px' }}
      title={
        <div className="tw-flex tw-items-center">
          <BarChartOutlined className="tw-mr-2 tw-text-green-500" />
          <span>订单统计分析</span>
        </div>
      }
    >
      {data && data.byType && data.byType.length > 0 ? (
        <>
          <Row gutter={[16, 16]} className="tw-mb-4">
            <Col span={12}>
              <Statistic
                title="总订单数量"
                value={data.totalCount || 0}
                suffix="笔"
                valueStyle={{ color: '#1677ff' }}
                prefix={<RiseOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="总订单金额"
                value={((data.totalAmount || 0) / 10000).toFixed(2)}
                suffix="万元"
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
          </Row>
          <ReactECharts
            option={getOption()}
            style={{ height: '400px' }}
            opts={{ renderer: 'svg' }}
          />
        </>
      ) : (
        <Empty description="暂无数据" />
      )}
    </Card>
  );
};

export default OrderStatisticsChart;
