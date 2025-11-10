/**
 * AI智能分析与预警组件
 */
import React from 'react';
import { Alert, Tag, Timeline, Row, Col, Space } from 'antd';
import {
  BulbOutlined,
  WarningOutlined,
  TrophyOutlined,
  RocketOutlined,
  ExclamationCircleOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { AIAnalysis } from '@/types/analysisReport';
import ChartCard from './ChartCard';

interface AIAnalysisPanelProps {
  data?: AIAnalysis;
  loading?: boolean;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ data, loading = false }) => {
  const getInsightColor = (level: string) => {
    const colors: Record<string, string> = {
      critical: 'error',
      high: 'warning',
      medium: 'processing',
      low: 'default',
    };
    return colors[level] || 'default';
  };

  const { overallAssessment, insights, warnings, recommendations } = data || {};

  return (
    <ChartCard
      title={
        <Space size="middle">
          <ThunderboltOutlined className="tw-text-yellow-500 tw-text-xl" />
          <span>AI智能分析与建议</span>
        </Space>
      }
      subtitle="基于机器学习算法的智能分析与预测建议"
      loading={loading}
      empty={!data}
      info="AI分析结果基于历史数据和行业标准，仅供参考"
      hoverable
    >
      <div className="tw-space-y-6">
        {/* 综合评价 */}
        {overallAssessment && (
          <Alert
            message={
              <div className="tw-flex tw-items-center tw-justify-between">
                <span className="tw-text-base tw-font-semibold">综合评价</span>
                <Tag
                  color="blue"
                  className="tw-text-sm tw-px-4 tw-py-1 tw-rounded-full tw-font-semibold"
                  icon={<CheckCircleOutlined />}
                >
                  {overallAssessment.ratingLabel}
                </Tag>
              </div>
            }
            description={
              <div className="tw-mt-3 tw-space-y-4">
                <p className="tw-text-sm tw-text-gray-700 tw-leading-relaxed">
                  {overallAssessment.summary}
                </p>
                <Row gutter={[12, 12]}>
                  <Col xs={24} sm={12}>
                    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-green-200 tw-shadow-sm">
                      <div className="tw-font-semibold tw-text-green-700 tw-mb-3 tw-flex tw-items-center tw-text-sm">
                        <TrophyOutlined className="tw-mr-2 tw-text-base" />
                        核心优势
                      </div>
                      <ul className="tw-text-sm tw-space-y-2 tw-text-gray-700">
                        {overallAssessment.strengths.slice(0, 3).map((s, i) => (
                          <li key={i} className="tw-flex tw-items-start">
                            <span className="tw-text-green-500 tw-mr-2 tw-mt-0.5">✓</span>
                            <span className="tw-flex-1">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-orange-200 tw-shadow-sm">
                      <div className="tw-font-semibold tw-text-orange-700 tw-mb-3 tw-flex tw-items-center tw-text-sm">
                        <WarningOutlined className="tw-mr-2 tw-text-base" />
                        待改进项
                      </div>
                      <ul className="tw-text-sm tw-space-y-2 tw-text-gray-700">
                        {overallAssessment.weaknesses.slice(0, 3).map((w, i) => (
                          <li key={i} className="tw-flex tw-items-start">
                            <span className="tw-text-orange-500 tw-mr-2 tw-mt-0.5">⚠</span>
                            <span className="tw-flex-1">{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            }
            type="info"
            showIcon
            className="tw-border-l-4 tw-border-l-blue-500"
          />
        )}

        {/* 风险预警 */}
        {warnings && warnings.length > 0 && (
          <div>
            <div className="tw-text-sm tw-font-semibold tw-mb-4 tw-text-red-600 tw-flex tw-items-center">
              <WarningOutlined className="tw-mr-2 tw-text-base" />
              风险预警
            </div>
            <div className="tw-space-y-3">
              {warnings.slice(0, 2).map(warning => (
                <Alert
                  key={warning.id}
                  message={
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-font-semibold tw-text-sm">{warning.title}</span>
                      <Tag
                        color={getInsightColor(warning.level)}
                        className="tw-ml-2"
                      >
                        {warning.level === 'critical' ? '严重' : warning.level === 'high' ? '高' : '中'}
                      </Tag>
                    </div>
                  }
                  description={
                    <div className="tw-mt-2 tw-space-y-3">
                      <p className="tw-text-sm tw-text-gray-700">{warning.description}</p>
                      <div className="tw-bg-blue-50 tw-p-3 tw-rounded-lg tw-border tw-border-blue-100">
                        <div className="tw-text-sm tw-font-semibold tw-text-blue-700 tw-mb-2 tw-flex tw-items-center">
                          <BulbOutlined className="tw-mr-2" />
                          建议措施
                        </div>
                        <ul className="tw-text-sm tw-space-y-1.5 tw-text-gray-700 tw-ml-4">
                          {warning.suggestedActions.slice(0, 2).map((action, i) => (
                            <li key={i} className="tw-list-disc">{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  }
                  type={
                    warning.level === 'critical' || warning.level === 'high' ? 'error' : 'warning'
                  }
                  showIcon
                  className="tw-border-l-4"
                />
              ))}
            </div>
          </div>
        )}

        {/* 业务建议 */}
        {recommendations && recommendations.length > 0 && (
          <div>
            <div className="tw-text-sm tw-font-semibold tw-mb-4 tw-text-blue-600 tw-flex tw-items-center">
              <RocketOutlined className="tw-mr-2 tw-text-base" />
              业务建议
            </div>
            <div className="tw-bg-white tw-p-5 tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-sm">
              <Timeline>
                {recommendations.slice(0, 3).map(rec => (
                  <Timeline.Item
                    key={rec.id}
                    color={
                      rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'blue' : 'green'
                    }
                    dot={
                      rec.priority === 'high' ? (
                        <ExclamationCircleOutlined className="tw-text-red-500" />
                      ) : rec.priority === 'medium' ? (
                        <BulbOutlined className="tw-text-blue-500" />
                      ) : (
                        <CheckCircleOutlined className="tw-text-green-500" />
                      )
                    }
                  >
                    <div>
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                        <span className="tw-font-semibold tw-text-sm tw-text-gray-800">
                          {rec.title}
                        </span>
                        <Tag
                          color={
                            rec.priority === 'high'
                              ? 'error'
                              : rec.priority === 'medium'
                              ? 'processing'
                              : 'success'
                          }
                          className="tw-text-xs"
                        >
                          {rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}
                        </Tag>
                      </div>
                      <div className="tw-text-sm tw-text-gray-600 tw-mb-2 tw-leading-relaxed">
                        {rec.description}
                      </div>
                      <div className="tw-text-xs tw-text-blue-600 tw-bg-white tw-inline-block tw-px-3 tw-py-1 tw-rounded-full">
                        💡 预期影响: {rec.expectedImpact}
                      </div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        )}
      </div>
    </ChartCard>
  );
};

export default AIAnalysisPanel;
