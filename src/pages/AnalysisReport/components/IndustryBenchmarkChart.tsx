/**
 * 行业对比分析组件
 */
import React, { useRef } from 'react';
import { Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ECharts } from 'echarts';
import {
  BarChartOutlined,
  TrophyOutlined,
  RiseOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import type { IndustryBenchmark } from '@/types/analysisReport';
import { THEME_COLORS, COMMON_CHART_CONFIG, ANIMATION_CONFIG } from '../config/chartTheme';
import ChartCard from './ChartCard';
import { useChartResize } from '../hooks/useChartResize';

interface IndustryBenchmarkChartProps {
  data?: IndustryBenchmark;
  loading?: boolean;
}

const IndustryBenchmarkChart: React.FC<IndustryBenchmarkChartProps> = ({
  data,
  loading = false,
}) => {
  const chartRef = useRef<ECharts | null>(null);
  const radarChartRef = useRef<ECharts | null>(null);
  useChartResize(chartRef);
  useChartResize(radarChartRef);

  const getScatterOption = (): EChartsOption => {
    if (!data) return {};

    const currentData = data.industryDistribution
      .filter(e => e.isCurrentEnterprise)
      .map(e => [e.creditScore, e.revenue, e.name]);
    const otherData = data.industryDistribution
      .filter(e => !e.isCurrentEnterprise)
      .map(e => [e.creditScore, e.revenue, e.name]);

    return {
      ...COMMON_CHART_CONFIG,
      ...ANIMATION_CONFIG,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 0,
        borderRadius: 12,
        padding: [12, 16],
        textStyle: {
          color: '#2d3748',
          fontSize: 13,
        },
        extraCssText: 'box-shadow: 0 10px 40px rgba(0,0,0,0.1); backdrop-filter: blur(10px);',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const item = params.data;
          return `
            <div style="min-width: 150px;">
              <div style="font-weight: 600; margin-bottom: 8px; color: #2d3748; font-size: 14px;">
                ${item[2]}
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #718096;">信用评分:</span>
                <span style="font-weight: 600; color: ${THEME_COLORS.primary[0]};">${item[0]}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #718096;">营收:</span>
                <span style="font-weight: 600; color: ${THEME_COLORS.primary[1]};">${(item[1] / 10000).toFixed(2)}亿</span>
              </div>
            </div>
          `;
        },
      },
      legend: {
        data: ['行业企业', '当前企业'],
        top: 10,
        textStyle: {
          fontSize: 13,
          color: '#4a5568',
        },
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        name: '信用评分',
        nameTextStyle: {
          fontSize: 12,
          color: '#4a5568',
          padding: [0, 0, 0, 40],
        },
        min: 600,
        max: 950,
        axisLabel: {
          fontSize: 11,
          color: '#64748b',
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0',
            type: 'dashed',
          },
        },
      },
      yAxis: {
        name: '营收(亿)',
        nameTextStyle: {
          fontSize: 12,
          color: '#4a5568',
        },
        axisLabel: {
          formatter: (v: number) => (v / 10000).toFixed(0),
          fontSize: 11,
          color: '#64748b',
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: '行业企业',
          type: 'scatter',
          data: otherData,
          symbolSize: 14,
          itemStyle: {
            color: THEME_COLORS.primary[0],
            opacity: 0.65,
            shadowBlur: 8,
            shadowColor: 'rgba(88, 143, 249, 0.3)',
          },
          emphasis: {
            scale: 1.4,
            itemStyle: {
              opacity: 1,
              shadowBlur: 15,
              shadowColor: 'rgba(88, 143, 249, 0.5)',
            },
          },
        },
        {
          name: '当前企业',
          type: 'scatter',
          data: currentData,
          symbolSize: 28,
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: THEME_COLORS.primary[4] },
                { offset: 1, color: THEME_COLORS.primary[6] },
              ],
            },
            shadowBlur: 18,
            shadowColor: 'rgba(148, 95, 185, 0.6)',
          },
          emphasis: {
            scale: 1.5,
            itemStyle: {
              shadowBlur: 25,
              shadowColor: 'rgba(148, 95, 185, 0.8)',
            },
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{b}',
            fontSize: 12,
            fontWeight: 'bold',
            color: THEME_COLORS.primary[4],
            distance: 5,
          },
        },
      ],
    };
  };

  // 雷达图配置 - 多维度对比
  const getRadarOption = (): EChartsOption => {
    if (!data || !data.currentEnterprise || !data.industryAverage) return {};

    const indicators = [
      { name: '信用评分', max: 1000 },
      { name: '营收规模', max: 100 },
      { name: '利润率', max: 100 },
      { name: '债务比率', max: 100 },
      { name: '周转率', max: 100 },
      { name: '供应链效率', max: 100 },
    ];

    return {
      ...COMMON_CHART_CONFIG,
      ...ANIMATION_CONFIG,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 0,
        borderRadius: 10,
        padding: [10, 14],
        textStyle: {
          color: '#2d3748',
          fontSize: 12,
        },
        extraCssText: 'box-shadow: 0 6px 20px rgba(0,0,0,0.1);',
      },
      legend: {
        data: ['当前企业', '行业平均'],
        bottom: 5,
        textStyle: {
          fontSize: 12,
          color: '#4a5568',
        },
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
      },
      radar: {
        indicator: indicators,
        radius: '65%',
        center: ['50%', '50%'],
        splitNumber: 4,
        shape: 'polygon',
        axisName: {
          fontSize: 12,
          color: '#4a5568',
          fontWeight: 600,
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#f9fafb', '#fff'],
          },
        },
        axisLine: {
          lineStyle: {
            color: '#cbd5e1',
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [
                data.currentEnterprise.creditScore,
                ((data.currentEnterprise.revenue / 1000) * 100) / 350,
                (data.currentEnterprise.profitMargin * 100) / 15,
                100 - data.currentEnterprise.debtRatio,
                (data.currentEnterprise.turnoverRate * 100) / 5,
                data.currentEnterprise.supplyChainEfficiency,
              ],
              name: '当前企业',
              lineStyle: {
                width: 3,
                color: THEME_COLORS.primary[4],
                shadowColor: 'rgba(111, 94, 249, 0.3)',
                shadowBlur: 10,
              },
              areaStyle: {
                opacity: 0.3,
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    { offset: 0, color: `${THEME_COLORS.primary[4]}80` },
                    { offset: 1, color: `${THEME_COLORS.primary[4]}20` },
                  ],
                },
              },
              itemStyle: {
                color: THEME_COLORS.primary[4],
                borderWidth: 2,
                borderColor: '#fff',
                shadowBlur: 8,
                shadowColor: 'rgba(111, 94, 249, 0.4)',
              },
              symbol: 'circle',
              symbolSize: 8,
            },
            {
              value: [
                data.industryAverage.creditScore,
                ((data.industryAverage.revenue / 1000) * 100) / 350,
                (data.industryAverage.profitMargin * 100) / 15,
                100 - data.industryAverage.debtRatio,
                (data.industryAverage.turnoverRate * 100) / 5,
                data.industryAverage.supplyChainEfficiency,
              ],
              name: '行业平均',
              lineStyle: {
                width: 2,
                color: THEME_COLORS.primary[1],
                type: 'dashed',
              },
              areaStyle: {
                opacity: 0.15,
                color: THEME_COLORS.primary[1],
              },
              itemStyle: {
                color: THEME_COLORS.primary[1],
                borderWidth: 2,
                borderColor: '#fff',
              },
              symbol: 'circle',
              symbolSize: 6,
            },
          ],
          emphasis: {
            lineStyle: {
              width: 4,
            },
            areaStyle: {
              opacity: 0.5,
            },
          },
        },
      ],
    };
  };

  const { ranking } = data || {};

  return (
    <ChartCard
      title={
        <div className="tw-flex tw-items-center">
          <BarChartOutlined className="tw-text-purple-500 tw-text-xl tw-mr-2" />
          <span>行业对比分析</span>
        </div>
      }
      subtitle="对比企业在行业中的信用与营收表现"
      loading={loading}
      empty={!data}
      info="红色标记为当前企业，蓝色为行业其他企业"
      height={600}
      hoverable
    >
      <div className="tw-space-y-6">
        {/* 排名信息 */}
        {ranking && (
          <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12}>
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
                  <TrophyOutlined className="tw-text-3xl tw-text-yellow-500" />
                  <div>
                    <div className="tw-text-xs tw-text-gray-500 tw-mb-1">行业排名</div>
                    <div className="tw-text-2xl tw-font-bold tw-text-purple-600">
                      第 {ranking.rank} 名
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
                  <RiseOutlined className="tw-text-3xl tw-text-blue-500" />
                  <div>
                    <div className="tw-text-xs tw-text-gray-500 tw-mb-1">超越</div>
                    <div className="tw-text-2xl tw-font-bold tw-text-blue-600">
                      {ranking.percentile}%
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* 散点图 */}
        <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
          <div className="tw-h-[220px]">
            <ReactECharts
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={(e: any) => {
                if (e) chartRef.current = e.getEchartsInstance();
              }}
              option={getScatterOption()}
              style={{ height: '380px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>

        {/* 多维度对比雷达图 */}
        {/* <div>
          <div className="tw-text-sm tw-font-semibold tw-text-gray-700 tw-mb-3 tw-flex tw-items-center">
            <RadarChartOutlined className="tw-mr-2 tw-text-purple-500" />
            多维度对比
          </div>
          <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
            <div className="tw-h-[220px]">
              <ReactECharts
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={(e: any) => {
                  if (e) radarChartRef.current = e.getEchartsInstance();
                }}
                option={getRadarOption()}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'canvas' }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </ChartCard>
  );
};

export default IndustryBenchmarkChart;
