import { Card, Skeleton, Empty } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { FinancialHealthMetrics } from '@/types/enterpriseDashboard';

interface FinancialHealthRadarProps {
  data?: FinancialHealthMetrics;
  loading?: boolean;
}

/**
 * 财务健康雷达图组件
 * 展示企业财务健康的多维度指标
 */
const FinancialHealthRadar: React.FC<FinancialHealthRadarProps> = ({
  data,
  loading = false,
}) => {
  const getOption = (): EChartsOption => {
    if (!data) {
      return {};
    }

    // 计算各个维度的综合得分 (0-100)
    const dimensions = [
      {
        name: '偿债能力',
        max: 100,
        // 资产负债率越低越好(反向)、流动比率和速动比率越高越好
        value:
          ((100 - data.assetLiabilityRatio) * 0.4 +
            Math.min(data.currentRatio * 25, 100) * 0.3 +
            Math.min(data.quickRatio * 30, 100) * 0.3),
      },
      {
        name: '盈利能力',
        max: 100,
        value: (data.netProfitMargin * 0.4 + data.roe * 0.3 + data.roa * 0.3),
      },
      {
        name: '运营能力',
        max: 100,
        // 周转率越高越好，做归一化处理
        value: Math.min((data.receivableTurnover * 5 + data.inventoryTurnover * 4) * 0.5, 100),
      },
      {
        name: '成长能力',
        max: 100,
        value: Math.min((data.revenueGrowthRate + data.profitGrowthRate) * 1.2, 100),
      },
      {
        name: '风险控制',
        max: 100,
        // 逾期率和违约率越低越好(反向)
        value: 100 - (data.overdueRate + data.defaultRate) * 5,
      },
      {
        name: '供应链稳定性',
        max: 100,
        // 现金周期越短越好、融资比例适中、信用额度使用合理
        value:
          Math.max(100 - data.cashConversionCycle * 0.8, 0) * 0.4 +
          (100 - Math.abs(data.supplyChainFinanceRatio - 40)) * 0.3 +
          (100 - Math.abs(data.creditUtilizationRate - 60)) * 0.3,
      },
    ];

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        textStyle: {
          color: '#333',
        },
        formatter: (params: any) => {
          const { name, value } = params;
          return `<div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${name}</div>
            <div style="color: #1677ff;">评分: ${value.toFixed(1)}</div>
          </div>`;
        },
      },
      radar: {
        indicator: dimensions,
        shape: 'circle',
        radius: '68%',
        center: ['50%', '52%'],
        splitNumber: 5,
        name: {
          color: '#333',
          fontSize: 13,
          fontWeight: 600,
          rich: {
            a: {
              color: '#1677ff',
              fontWeight: 'bold',
            },
          },
        } as any,
        splitLine: {
          lineStyle: {
            color: ['rgba(22, 119, 255, 0.3)', 'rgba(22, 119, 255, 0.2)', 'rgba(22, 119, 255, 0.15)', 'rgba(22, 119, 255, 0.1)', 'rgba(22, 119, 255, 0.05)'],
            width: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(22, 119, 255, 0.3)',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'rgba(22, 119, 255, 0.08)',
              'rgba(114, 46, 209, 0.06)',
              'rgba(22, 119, 255, 0.04)',
              'rgba(114, 46, 209, 0.03)',
              'rgba(22, 119, 255, 0.01)',
            ],
            shadowBlur: 15,
            shadowColor: 'rgba(22, 119, 255, 0.2)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(22, 119, 255, 0.4)',
            width: 2,
            shadowBlur: 8,
            shadowColor: 'rgba(22, 119, 255, 0.5)',
          },
        },
      },
      series: [
        {
          type: 'radar',
          symbol: 'circle',
          symbolSize: 8,
          data: [
            {
              value: dimensions.map(d => d.value),
              name: '财务健康指标',
              areaStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    { offset: 0, color: 'rgba(22, 119, 255, 0.6)' },
                    { offset: 0.5, color: 'rgba(114, 46, 209, 0.4)' },
                    { offset: 1, color: 'rgba(22, 119, 255, 0.1)' },
                  ],
                },
                shadowBlur: 20,
                shadowColor: 'rgba(22, 119, 255, 0.5)',
              },
              lineStyle: {
                width: 3,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#1677ff' },
                    { offset: 1, color: '#722ed1' },
                  ],
                },
                shadowBlur: 15,
                shadowColor: 'rgba(22, 119, 255, 0.8)',
              },
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    { offset: 0, color: '#fff' },
                    { offset: 0.7, color: '#1677ff' },
                    { offset: 1, color: '#722ed1' },
                  ],
                },
                borderColor: '#fff',
                borderWidth: 3,
                shadowBlur: 15,
                shadowColor: 'rgba(22, 119, 255, 0.9)',
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 25,
                  shadowColor: 'rgba(22, 119, 255, 1)',
                  borderWidth: 4,
                },
                lineStyle: {
                  width: 4,
                  shadowBlur: 20,
                },
              },
            },
          ],
          animationDuration: 2000,
          animationEasing: 'elasticOut',
          animationDelay: (idx: number) => idx * 100,
        },
      ],
    };
  };

  if (loading) {
    return (
      <Card
        className="tw-border tw-border-gray-200 tw-shadow-sm"
        title={
          <div className="tw-flex tw-items-center">
            <DashboardOutlined className="tw-mr-2 tw-text-purple-500" />
            <span>财务健康雷达图</span>
          </div>
        }
      >
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  return (
    <Card
      className="tw-border tw-border-purple-100 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-bg-gradient-to-br tw-from-white tw-to-purple-50/20 tw-h-full"
      bodyStyle={{ padding: '16px' }}
      title={
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-items-center">
            <DashboardOutlined className="tw-mr-2 tw-text-purple-500" />
            <span>财务健康雷达图</span>
          </div>
          {data && (
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-text-gray-500">综合评分</span>
              <span className="tw-text-xl tw-font-bold tw-text-purple-600">
                {data.comprehensiveScore.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      }
    >
      {data ? (
        <ReactECharts
          option={getOption()}
          style={{ height: '350px' }}
          opts={{ renderer: 'svg' }}
        />
      ) : (
        <Empty description="暂无数据" />
      )}
    </Card>
  );
};

export default FinancialHealthRadar;

