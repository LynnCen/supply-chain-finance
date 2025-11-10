/**
 * 多维风险分析旭日图组件
 * 使用ECharts Sunburst图表展示分层风险结构
 */
import React, { useRef } from 'react';
import { Row, Col, Statistic, Tag, Alert } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ECharts } from 'echarts';
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { RiskAnalysis } from '@/types/analysisReport';
import { COMMON_CHART_CONFIG, ANIMATION_CONFIG } from '../config/chartTheme';
import ChartCard from './ChartCard';
import { useChartResize } from '../hooks/useChartResize';

interface RiskAnalysisSunburstProps {
  data?: RiskAnalysis;
  loading?: boolean;
}

/**
 * 获取风险等级颜色 - 使用专业渐变色系
 */
const getRiskLevelColor = (level?: number): string => {
  // 使用主题渐变色系，根据风险等级映射
  if (!level) return '#43e97b'; // 低风险 - 绿色
  if (level >= 4) return '#ef4444'; // 极高风险 - 深红
  if (level >= 3) return '#fa709a'; // 高风险 - 粉红
  if (level >= 2) return '#ff9845'; // 中风险 - 橙色
  return '#43e97b'; // 低风险 - 绿色
};

/**
 * 获取风险等级渐变色
 */
const getRiskLevelGradient = (level?: number) => {
  if (!level || level < 2) {
    // 低风险 - 绿色渐变
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#43e97b' },
        { offset: 1, color: '#30cfd0' },
      ],
    };
  }
  if (level >= 4) {
    // 极高风险 - 深红渐变
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#ef4444' },
        { offset: 1, color: '#dc2626' },
      ],
    };
  }
  if (level >= 3) {
    // 高风险 - 粉红渐变
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
        { offset: 0, color: '#fa709a' },
        { offset: 1, color: '#f093fb' },
      ],
    };
  }
  // 中风险 - 橙色渐变
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      { offset: 0, color: '#ff9845' },
      { offset: 1, color: '#fee140' },
    ],
  };
};

/**
 * 获取风险等级标签
 */
const getRiskLevelLabel = (level: string) => {
  const labels: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
    high: { text: '高风险', color: 'error', icon: <ExclamationCircleOutlined /> },
    medium: { text: '中风险', color: 'warning', icon: <WarningOutlined /> },
    low: { text: '低风险', color: 'success', icon: <CheckCircleOutlined /> },
  };
  return labels[level] || labels.low;
};

const RiskAnalysisSunburst: React.FC<RiskAnalysisSunburstProps> = ({ data, loading = false }) => {
  const chartRef = useRef<ECharts | null>(null);
  useChartResize(chartRef);

  const getSunburstOption = (): EChartsOption => {
    if (!data || !data.riskTree || data.riskTree.length === 0) return {};

    // 递归处理节点颜色 - 使用渐变色
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processNode = (node: any): any => {
      const color = getRiskLevelColor(node.level);
      const gradient = getRiskLevelGradient(node.level);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processed: any = {
        ...node,
        itemStyle: {
          color: gradient,
          borderColor: '#fff',
          borderWidth: 2,
          shadowBlur: 12,
          shadowColor: `${color}40`,
          shadowOffsetY: 3,
        },
      };

      if (node.children && node.children.length > 0) {
        processed.children = node.children.map(processNode);
      }

      return processed;
    };

    const processedData = data.riskTree.map(processNode);

    return {
      ...COMMON_CHART_CONFIG,
      ...ANIMATION_CONFIG,
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderWidth: 0,
        borderRadius: 10,
        padding: [12, 16],
        textStyle: {
          color: '#2d3748',
          fontSize: 13,
        },
        extraCssText: 'box-shadow: 0 8px 30px rgba(0,0,0,0.12); backdrop-filter: blur(10px);',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const { name, value, data } = params;
          const level = data.level || 0;
          const levelText =
            level >= 4 ? '极高风险' : level >= 3 ? '高风险' : level >= 2 ? '中风险' : '低风险';
          const levelColor = getRiskLevelColor(level);

          return `
            <div style="min-width: 160px;">
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
                ${name}
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #718096;">风险值:</span>
                <span style="font-weight: 600; color: ${levelColor};">${value}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: ${levelColor}; border-radius: 50%;"></span>
                <span style="color: ${levelColor}; font-weight: 600; font-size: 12px;">${levelText}</span>
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          type: 'sunburst',
          data: processedData,
          radius: ['20%', '90%'],
          center: ['50%', '50%'],
          sort: undefined,
          itemStyle: {
            borderRadius: 6,
            borderWidth: 2.5,
            borderColor: '#fff',
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
          label: {
            rotate: 'radial',
            fontSize: 11,
            fontWeight: 600,
            color: '#2d3748',
            distance: 5,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => {
              const maxLength = 6;
              const name = params.name;
              return name.length > maxLength ? name.substring(0, maxLength) + '..' : name;
            },
          },
          emphasis: {
            focus: 'ancestor',
            itemStyle: {
              shadowBlur: 25,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowOffsetY: 5,
            },
            label: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#1a202c',
              textShadowColor: 'rgba(255, 255, 255, 0.8)',
              textShadowBlur: 4,
            },
          },
          levels: [
            {},
            {
              r0: '20%',
              r: '40%',
              label: {
                fontSize: 13,
                fontWeight: 'bold',
                color: '#1a202c',
              },
              itemStyle: {
                borderWidth: 3,
              },
            },
            {
              r0: '40%',
              r: '65%',
              label: {
                fontSize: 11,
                color: '#2d3748',
              },
              itemStyle: {
                borderWidth: 2,
              },
            },
            {
              r0: '65%',
              r: '90%',
              label: {
                fontSize: 10,
                position: 'outside',
                padding: 2,
                silent: false,
                color: '#4a5568',
              },
              itemStyle: {
                borderWidth: 2,
              },
            },
          ],
        },
      ],
    };
  };

  const { summary, riskDetails } = data || {};

  return (
    <ChartCard
      title={
        <div className="tw-flex tw-items-center">
          <DashboardOutlined className="tw-text-orange-500 tw-text-xl tw-mr-2" />
          <span>多维风险分析</span>
        </div>
      }
      subtitle="基于财务、运营、市场等多维度风险识别与评估"
      loading={loading}
      empty={!data || !data.riskTree || data.riskTree.length === 0}
      info="从内到外分别展示：一级风险类别、二级风险子类、三级具体风险点"
      height="auto"
      hoverable
    >
      <div className="tw-space-y-6">
        {/* 风险统计卡片 */}
        {summary && (
          <Row gutter={[12, 12]}>
            <Col xs={12} sm={6}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-blue-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={
                    <span className="tw-text-xs tw-text-gray-600 tw-font-medium">风险点总数</span>
                  }
                  value={summary.totalRiskPoints}
                  suffix="个"
                  valueStyle={{ color: '#667eea', fontSize: '22px', fontWeight: 'bold' }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-red-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">高风险</span>}
                  value={summary.highRiskCount}
                  suffix="个"
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: '#fa709a', fontSize: '22px', fontWeight: 'bold' }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-orange-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">中风险</span>}
                  value={summary.mediumRiskCount}
                  suffix="个"
                  prefix={<WarningOutlined />}
                  valueStyle={{ color: '#ff9845', fontSize: '22px', fontWeight: 'bold' }}
                />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-green-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">低风险</span>}
                  value={summary.lowRiskCount}
                  suffix="个"
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#43e97b', fontSize: '22px', fontWeight: 'bold' }}
                />
              </div>
            </Col>
          </Row>
        )}

        {/* 旭日图 */}
        <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
          <div className="tw-h-[480px] tw-relative">
            <ReactECharts
              ref={e => {
                if (e) chartRef.current = e.getEchartsInstance();
              }}
              option={getSunburstOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>

        {/* 重点风险提示 */}
        {riskDetails && riskDetails.length > 0 && (
          <div>
            <div className="tw-mb-4 tw-text-sm tw-font-semibold tw-text-gray-700 tw-flex tw-items-center">
              <ExclamationCircleOutlined className="tw-mr-2 tw-text-orange-500" />
              重点风险提示
            </div>
            <div className="tw-space-y-3">
              {riskDetails.slice(0, 3).map((risk, index) => {
                const levelInfo = getRiskLevelLabel(risk.level);
                return (
                  <Alert
                    key={index}
                    message={
                      <div className="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-gap-2">
                        <span className="tw-font-semibold tw-text-sm tw-text-gray-800">
                          {risk.category} - {risk.subcategory}
                        </span>
                        <Tag color={levelInfo.color} icon={levelInfo.icon} className="tw-ml-2">
                          {levelInfo.text}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="tw-mt-3 tw-space-y-3">
                        <div className="tw-text-gray-700 tw-text-sm tw-leading-relaxed">
                          {risk.description}
                        </div>
                        <div className="tw-bg-blue-50 tw-p-3 tw-rounded-lg tw-border tw-border-blue-100">
                          <div className="tw-text-sm tw-text-gray-800">
                            <span className="tw-font-semibold tw-text-blue-700">💡 改进建议: </span>
                            <span className="tw-text-gray-700">{risk.suggestion}</span>
                          </div>
                        </div>
                      </div>
                    }
                    type={
                      risk.level === 'high' ? 'error' : risk.level === 'medium' ? 'warning' : 'info'
                    }
                    showIcon
                    className="tw-border-l-4"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ChartCard>
  );
};

export default RiskAnalysisSunburst;
