/**
 * 综合信用评分仪表盘组件
 * 使用ECharts Gauge图表展示企业信用评分
 * 采用现代化设计风格，玻璃态效果和渐变色
 */
import React, { useRef } from 'react';
import { Row, Col, Tag, Space } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ECharts } from 'echarts';
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  MinusOutlined,
  StarFilled,
  ThunderboltOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import type { CreditScore } from '@/types/analysisReport';
import { THEME_COLORS, COMMON_CHART_CONFIG, ANIMATION_CONFIG } from '../config/chartTheme';
import ChartCard from './ChartCard';
import { useChartResize } from '../hooks/useChartResize';

interface CreditScoreGaugeProps {
  data?: CreditScore;
  loading?: boolean;
}

/**
 * 获取信用等级颜色
 */
const getLevelColor = (level: string) => {
  const colorMap: Record<string, string> = {
    excellent: THEME_COLORS.credit.excellent,
    good: THEME_COLORS.credit.good,
    medium: THEME_COLORS.credit.medium,
    poor: THEME_COLORS.credit.poor,
    bad: THEME_COLORS.credit.bad,
  };
  return colorMap[level] || '#d9d9d9';
};

/**
 * 获取信用等级标签
 */
const getLevelLabel = (level: string) => {
  const labelMap: Record<string, string> = {
    excellent: '优秀',
    good: '良好',
    medium: '中等',
    poor: '较差',
    bad: '差',
  };
  return labelMap[level] || '未知';
};

/**
 * 获取趋势信息
 */
const getTrendInfo = (trend: string) => {
  if (trend === 'up') {
    return {
      icon: <RiseOutlined />,
      color: THEME_COLORS.financial.profit,
      label: '上升',
    };
  } else if (trend === 'down') {
    return {
      icon: <FallOutlined />,
      color: THEME_COLORS.financial.loss,
      label: '下降',
    };
  } else {
    return {
      icon: <MinusOutlined />,
      color: '#8c8c8c',
      label: '稳定',
    };
  }
};

const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({ data, loading = false }) => {
  const chartRef = useRef<ECharts | null>(null);
  const trendChartRef = useRef<ECharts | null>(null);
  useChartResize(chartRef);
  useChartResize(trendChartRef);

  const getMainGaugeOption = (): EChartsOption => {
    if (!data) return {};

    const score = data.score;

    return {
      ...COMMON_CHART_CONFIG,
      ...ANIMATION_CONFIG,
      series: [
        {
          type: 'gauge',
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 1000,
          splitNumber: 10,
          radius: '85%',
          center: ['50%', '60%'],
          axisLine: {
            lineStyle: {
              width: 35,
              color: [
                [0.2, '#f093fb'], // 粉紫
                [0.4, '#667eea'], // 紫蓝
                [0.6, '#4facfe'], // 天蓝
                [0.8, '#43e97b'], // 绿色
                [1, '#30cfd0'], // 青蓝
              ],
              shadowColor: 'rgba(102, 126, 234, 0.25)',
              shadowBlur: 25,
              shadowOffsetY: 6,
            },
          },
          pointer: {
            width: 7,
            length: '72%',
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
                  { offset: 1, color: '#667eea80' },
                ],
              },
              shadowColor: 'rgba(102, 126, 234, 0.6)',
              shadowBlur: 20,
              shadowOffsetY: 4,
            },
          },
          axisTick: {
            distance: -35,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -35,
            length: 20,
            lineStyle: {
              color: '#fff',
              width: 4,
              shadowColor: 'rgba(0, 0, 0, 0.15)',
              shadowBlur: 6,
            },
          },
          axisLabel: {
            distance: -65,
            color: '#4a5568',
            fontSize: 12,
            fontWeight: 600,
            formatter: (value: number) => {
              if (value % 200 === 0) return value.toString();
              return '';
            },
          },
          title: {
            show: true,
            offsetCenter: [0, '85%'],
            fontSize: 18,
            color: '#64748b',
            fontWeight: 600,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}',
            color: '#667eea',
            fontSize: 52,
            fontWeight: 'bold',
            offsetCenter: [0, '30%'],
            textShadowColor: 'rgba(102, 126, 234, 0.3)',
            textShadowBlur: 15,
            rich: {
              value: {
                fontSize: 52,
                fontWeight: 'bold',
                color: '#667eea',
              },
            },
          },
          data: [
            {
              value: score,
              name: '信用评分',
            },
          ],
        },
      ],
    };
  };

  // 历史趋势图表配置
  const getTrendLineOption = (): EChartsOption => {
    if (!data || !data.history || data.history.length === 0) return {};

    return {
      ...COMMON_CHART_CONFIG,
      grid: {
        left: '8%',
        right: '8%',
        bottom: '15%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: data.history.map(item => item.date),
        axisLabel: {
          fontSize: 11,
          color: '#64748b',
          rotate: 30,
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0',
          },
        },
      },
      yAxis: {
        type: 'value',
        min: Math.min(...data.history.map(item => item.score)) - 50,
        max: Math.max(...data.history.map(item => item.score)) + 50,
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
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 0,
        borderRadius: 8,
        padding: [8, 12],
        textStyle: {
          color: '#2d3748',
          fontSize: 12,
        },
        extraCssText: 'box-shadow: 0 4px 20px rgba(0,0,0,0.08);',
      },
      series: [
        {
          type: 'line',
          data: data.history.map(item => item.score),
          smooth: true,
          lineStyle: {
            width: 4,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#667eea' },
                { offset: 0.5, color: '#764ba2' },
                { offset: 1, color: '#4facfe' },
              ],
            },
            shadowColor: 'rgba(102, 126, 234, 0.4)',
            shadowBlur: 12,
            shadowOffsetY: 4,
          },
          itemStyle: {
            color: '#667eea',
            borderColor: '#fff',
            borderWidth: 3,
            shadowBlur: 8,
            shadowColor: 'rgba(102, 126, 234, 0.5)',
          },
          areaStyle: {
            opacity: 0.35,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(102, 126, 234, 0.6)' },
                { offset: 0.5, color: 'rgba(118, 75, 162, 0.4)' },
                { offset: 1, color: 'rgba(79, 172, 254, 0.1)' },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 8,
          emphasis: {
            scale: 1.5,
            itemStyle: {
              shadowBlur: 10,
            },
          },
        },
      ],
    };
  };

  const trendInfo = data ? getTrendInfo(data.trend) : null;

  return (
    <ChartCard
      title={
        <Space size="middle">
          <TrophyOutlined className="tw-text-blue-500 tw-text-xl" />
          <span>综合信用评分</span>
        </Space>
      }
      subtitle="基于企业财务、交易、还款等多维度数据综合评估"
      loading={loading}
      empty={!data}
      info="信用评分范围：0-1000分，分数越高信用越好"
      hoverable
    >
      <div className="tw-space-y-6">
        {/* 主仪表盘 */}
        <div className="tw-h-[380px]">
          <ReactECharts
            ref={e => {
              if (e) chartRef.current = e.getEchartsInstance();
            }}
            option={getMainGaugeOption()}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>

        {/* 评级卡片区域 */}
        {data && (
          <div className="tw-bg-white tw-rounded-xl tw-p-5 tw-border tw-border-gray-200 tw-shadow-sm">
            <Row gutter={[24, 16]} align="middle">
              {/* 信用等级 */}
              <Col xs={24} sm={8}>
                <div className="tw-text-center">
                  <div className="tw-text-xs tw-text-gray-500 tw-mb-3 tw-font-medium">信用等级</div>
                  <Tag
                    color={getLevelColor(data.level)}
                    className="tw-text-base tw-font-bold tw-px-6 tw-py-2 tw-rounded-full tw-border-2"
                    style={{
                      borderColor: getLevelColor(data.level),
                      background: `${getLevelColor(data.level)}20`,
                      color: getLevelColor(data.level),
                    }}
                  >
                    <StarFilled className="tw-mr-2" />
                    {getLevelLabel(data.level)}
                  </Tag>
                </div>
              </Col>

              {/* 趋势 */}
              <Col xs={24} sm={8}>
                <div className="tw-text-center">
                  <div className="tw-text-xs tw-text-gray-500 tw-mb-3 tw-font-medium">评分趋势</div>
                  {trendInfo && (
                    <Tag
                      className="tw-text-base tw-font-bold tw-px-6 tw-py-2 tw-rounded-full tw-border-2"
                      style={{
                        borderColor: trendInfo.color,
                        background: `${trendInfo.color}20`,
                        color: trendInfo.color,
                      }}
                    >
                      {trendInfo.icon}
                      <span className="tw-ml-2">{trendInfo.label}</span>
                    </Tag>
                  )}
                </div>
              </Col>

              {/* 变化幅度 */}
              <Col xs={24} sm={8}>
                <div className="tw-text-center">
                  <div className="tw-text-xs tw-text-gray-500 tw-mb-3 tw-font-medium">
                    较上期变化
                  </div>
                  <div
                    className="tw-text-2xl tw-font-bold"
                    style={{
                      color: trendInfo?.color,
                    }}
                  >
                    {data.trendValue > 0 ? '+' : ''}
                    {data.trendValue} 分
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* 历史趋势 */}
        {data && data.history && data.history.length > 0 && (
          <div>
            <div className="tw-text-sm tw-font-semibold tw-text-gray-700 tw-mb-3 tw-flex tw-items-center">
              <LineChartOutlined className="tw-mr-2 tw-text-blue-500" />
              历史趋势
            </div>
            <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
              <div className="tw-h-[180px]">
                <ReactECharts
                  ref={e => {
                    if (e) trendChartRef.current = e.getEchartsInstance();
                  }}
                  option={getTrendLineOption()}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'canvas' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 分项得分 */}
        {data && data.breakdown && (
          <div>
            <div className="tw-text-sm tw-font-semibold tw-text-gray-700 tw-mb-3 tw-flex tw-items-center">
              <ThunderboltOutlined className="tw-mr-2 tw-text-blue-500" />
              分项得分
            </div>
            <Row gutter={[12, 12]}>
              {Object.entries(data.breakdown).map(([key, value]) => {
                const labels: Record<string, string> = {
                  paymentHistory: '还款历史',
                  debtBurden: '债务负担',
                  businessStability: '经营稳定',
                  industryStatus: '行业地位',
                  supplyChainHealth: '供应链健康',
                };
                const percentage = (value / 200) * 100;
                return (
                  <Col xs={24} sm={12} md={8} lg={6} xl={4} key={key}>
                    <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-gray-200 hover:tw-border-blue-300 tw-transition-all tw-duration-200 hover:tw-shadow-md tw-group">
                      <div className="tw-text-xs tw-text-gray-500 tw-mb-2">{labels[key]}</div>
                      <div className="tw-flex tw-items-baseline tw-mb-2">
                        <span
                          className="tw-text-2xl tw-font-bold"
                          style={{ color: getLevelColor(data.level) }}
                        >
                          {value}
                        </span>
                        <span className="tw-text-xs tw-text-gray-400 tw-ml-1">/200</span>
                      </div>
                      {/* 进度条 */}
                      <div className="tw-w-full tw-h-1.5 tw-bg-gray-100 tw-rounded-full tw-overflow-hidden">
                        <div
                          className="tw-h-full tw-rounded-full tw-transition-all tw-duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: getLevelColor(data.level),
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
      </div>
    </ChartCard>
  );
};

export default CreditScoreGauge;
