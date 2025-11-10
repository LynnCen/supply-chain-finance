import { Card, Skeleton, Empty, Statistic, Row, Col } from 'antd';
import { LineChartOutlined, RiseOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { TransactionTrend } from '@/types/enterpriseDashboard';

interface TransactionTrendChartProps {
  data?: TransactionTrend;
  loading?: boolean;
}

/**
 * 交易趋势图组件
 * 双轴图：左轴显示交易金额（面积图），右轴显示交易笔数（折线图）
 */
const TransactionTrendChart: React.FC<TransactionTrendChartProps> = ({
  data,
  loading = false,
}) => {
  const getOption = (): EChartsOption => {
    if (!data || !data.timeline.length) {
      return {};
    }

    const dates = data.timeline.map(item => item.date);
    const amounts = data.timeline.map(item => item.amount);
    const counts = data.timeline.map(item => item.count);

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        textStyle: {
          color: '#333',
        },
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
        formatter: (params: any) => {
          const date = params[0].axisValue;
          const amount = params[0].value;
          const count = params[1].value;
          return `<div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">${date}</div>
            <div style="margin-bottom: 4px;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #1677ff; border-radius: 50%; margin-right: 8px;"></span>
              交易金额: <span style="color: #1677ff; font-weight: bold;">${(amount / 10000).toFixed(2)} 万元</span>
            </div>
            <div>
              <span style="display: inline-block; width: 10px; height: 10px; background: #722ed1; border-radius: 50%; margin-right: 8px;"></span>
              交易笔数: <span style="color: #722ed1; font-weight: bold;">${count} 笔</span>
            </div>
          </div>`;
        },
      },
      legend: {
        data: ['交易金额', '交易笔数'],
        top: 10,
        textStyle: {
          fontSize: 12,
        },
      },
      grid: {
        top: 60,
        left: 70,
        right: 70,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#d0d0d0',
          },
        },
        axisLabel: {
          color: '#666',
          fontSize: 11,
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '交易金额（元）',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1677ff',
            },
          },
          axisLabel: {
            color: '#666',
            formatter: (value: number) => {
              if (value >= 10000) {
                return `${(value / 10000).toFixed(0)}万`;
              }
              return value.toString();
            },
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0',
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          name: '交易笔数',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#722ed1',
            },
          },
          axisLabel: {
            color: '#666',
            formatter: '{value} 笔',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '交易金额',
          type: 'line',
          yAxisIndex: 0,
          data: amounts,
          smooth: 0.4,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: true,
          lineStyle: {
            width: 4,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#1677ff' },
                { offset: 0.5, color: '#40a9ff' },
                { offset: 1, color: '#722ed1' },
              ],
            },
            shadowBlur: 20,
            shadowColor: 'rgba(22, 119, 255, 0.8)',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(22, 119, 255, 0.6)' },
                { offset: 0.5, color: 'rgba(64, 169, 255, 0.3)' },
                { offset: 1, color: 'rgba(114, 46, 209, 0.1)' },
              ],
            },
            shadowBlur: 25,
            shadowColor: 'rgba(22, 119, 255, 0.4)',
          },
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: '#fff' },
                { offset: 0.6, color: '#40a9ff' },
                { offset: 1, color: '#1677ff' },
              ],
            },
            borderColor: '#fff',
            borderWidth: 3,
            shadowBlur: 20,
            shadowColor: 'rgba(22, 119, 255, 1)',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 30,
              shadowColor: 'rgba(22, 119, 255, 1)',
              borderWidth: 4,
            },
            lineStyle: {
              width: 5,
              shadowBlur: 25,
            },
          },
        },
        {
          name: '交易笔数',
          type: 'line',
          yAxisIndex: 1,
          data: counts,
          smooth: 0.4,
          symbol: 'diamond',
          symbolSize: 10,
          showSymbol: true,
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#722ed1' },
                { offset: 0.5, color: '#b37feb' },
                { offset: 1, color: '#d3adf7' },
              ],
            },
            shadowBlur: 18,
            shadowColor: 'rgba(114, 46, 209, 0.7)',
          },
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: '#fff' },
                { offset: 0.6, color: '#b37feb' },
                { offset: 1, color: '#722ed1' },
              ],
            },
            borderColor: '#fff',
            borderWidth: 3,
            shadowBlur: 18,
            shadowColor: 'rgba(114, 46, 209, 1)',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 28,
              shadowColor: 'rgba(114, 46, 209, 1)',
              borderWidth: 4,
            },
            lineStyle: {
              width: 4,
              shadowBlur: 22,
            },
          },
        },
      ],
      animationDuration: 2500,
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => idx * 50,
    };
  };

  if (loading) {
    return (
      <Card
        className="tw-border tw-border-gray-200 tw-shadow-sm"
        title={
          <div className="tw-flex tw-items-center">
            <LineChartOutlined className="tw-mr-2 tw-text-blue-500" />
            <span>交易趋势分析</span>
          </div>
        }
      >
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  return (
    <Card
      className="tw-border tw-border-blue-100 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-bg-gradient-to-br tw-from-white tw-to-blue-50/20 tw-h-full"
      bodyStyle={{ padding: '16px' }}
      title={
        <div className="tw-flex tw-items-center">
          <LineChartOutlined className="tw-mr-2 tw-text-blue-500" />
          <span>交易趋势分析</span>
        </div>
      }
    >
      {data ? (
        <>
          <Row gutter={16} className="tw-mb-4">
            <Col span={6}>
              <Statistic
                title="总交易金额"
                value={data.totalAmount / 10000}
                precision={2}
                suffix="万元"
                valueStyle={{ color: '#1677ff' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="总交易笔数"
                value={data.totalCount}
                suffix="笔"
                valueStyle={{ color: '#722ed1' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="平均交易金额"
                value={data.avgAmount / 10000}
                precision={2}
                suffix="万元"
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="最高交易金额"
                value={data.maxAmount / 10000}
                precision={2}
                suffix="万元"
                valueStyle={{ color: '#fa8c16' }}
                prefix={<RiseOutlined />}
              />
            </Col>
          </Row>
          <ReactECharts
            option={getOption()}
            style={{ height: '320px' }}
            opts={{ renderer: 'svg' }}
          />
        </>
      ) : (
        <Empty description="暂无数据" />
      )}
    </Card>
  );
};

export default TransactionTrendChart;

