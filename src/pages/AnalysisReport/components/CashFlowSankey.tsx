/**
 * 供应链资金流向桑基图组件
 * 使用ECharts Sankey图表展示资金流向
 */
import React, { useRef } from 'react';
import { Row, Col, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { ECharts } from 'echarts';
import { SwapOutlined, RiseOutlined, FallOutlined, DollarOutlined } from '@ant-design/icons';
import type { SupplyChainCashFlow } from '@/types/analysisReport';
import { THEME_COLORS, COMMON_CHART_CONFIG, ANIMATION_CONFIG } from '../config/chartTheme';
import ChartCard from './ChartCard';
import { useChartResize } from '../hooks/useChartResize';

interface CashFlowSankeyProps {
  data?: SupplyChainCashFlow;
  loading?: boolean;
}

const CashFlowSankey: React.FC<CashFlowSankeyProps> = ({ data, loading = false }) => {
  const chartRef = useRef<ECharts | null>(null);
  useChartResize(chartRef);

  const getSankeyOption = (): EChartsOption => {
    if (!data || !data.nodes || !data.links) return {};

    return {
      ...COMMON_CHART_CONFIG,
      ...ANIMATION_CONFIG,
      color: [
        '#667eea', // 紫蓝渐变
        '#764ba2',
        '#f093fb',
        '#4facfe',
        '#00f2fe',
        '#43e97b',
        '#38f9d7',
        '#fa709a',
        '#fee140',
        '#30cfd0',
      ],
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
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
          if (params.dataType === 'edge') {
            return `
              <div style="min-width: 180px;">
                <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #2d3748;">
                  ${params.data.source} → ${params.data.target}
                </div>
                <div style="color: #667eea; font-size: 18px; font-weight: bold;">
                  ${params.data.value.toLocaleString()} 万元
                </div>
              </div>
            `;
          } else {
            return `
              <div style="padding: 4px;">
                <div style="font-size: 14px; font-weight: 600; color: #2d3748;">
                  ${params.name}
                </div>
              </div>
            `;
          }
        },
      },
      series: [
        {
          type: 'sankey',
          data: data.nodes,
          links: data.links,
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              opacity: 0.8,
              width: 4,
            },
          },
          nodeAlign: 'justify',
          layoutIterations: 0,
          nodeWidth: 32,
          nodeGap: 16,
          left: '5%',
          right: '15%',
          top: '8%',
          bottom: '8%',
          lineStyle: {
            color: 'gradient',
            curveness: 0.5,
            opacity: 0.5,
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
            shadowBlur: 15,
            shadowColor: 'rgba(102, 126, 234, 0.25)',
            shadowOffsetY: 3,
          },
          label: {
            position: 'right',
            fontSize: 13,
            fontWeight: 600,
            color: '#4a5568',
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
          <SwapOutlined className="tw-text-green-500 tw-text-xl tw-mr-2" />
          <span>供应链资金流向</span>
        </div>
      }
      subtitle="展示企业与上下游合作伙伴的资金流动情况"
      loading={loading}
      empty={!data || !data.nodes || !data.links}
      info="线条粗细代表资金流量大小，鼠标悬停查看详细流向信息"
      height={650}
      hoverable
    >
      <div className="tw-space-y-6">
        {/* 资金流向统计 */}
        {summary && (
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={8}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-green-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">总流入</span>}
                  value={summary.totalInflow}
                  suffix="万元"
                  prefix={<RiseOutlined />}
                  valueStyle={{
                    color: THEME_COLORS.financial.profit,
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-orange-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={<span className="tw-text-xs tw-text-gray-600 tw-font-medium">总流出</span>}
                  value={summary.totalOutflow}
                  suffix="万元"
                  prefix={<FallOutlined />}
                  valueStyle={{
                    color: THEME_COLORS.financial.loss,
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-border tw-border-purple-200 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
                <Statistic
                  title={
                    <span className="tw-text-xs tw-text-gray-600 tw-font-medium">净现金流</span>
                  }
                  value={summary.netCashFlow}
                  suffix="万元"
                  prefix={<DollarOutlined />}
                  valueStyle={{
                    color:
                      summary.netCashFlow >= 0
                        ? THEME_COLORS.financial.profit
                        : THEME_COLORS.financial.loss,
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                />
              </div>
            </Col>
          </Row>
        )}

        {/* 桑基图 */}
        <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-border tw-border-gray-200 tw-shadow-sm">
          <div className="tw-h-[450px]">
            <ReactECharts
              ref={e => {
                if (e) chartRef.current = e.getEchartsInstance();
              }}
              option={getSankeyOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>
      </div>
    </ChartCard>
  );
};

export default CashFlowSankey;
