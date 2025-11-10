/**
 * 统一的图表卡片组件
 * 提供一致的样式、加载状态、空状态和工具栏
 */
import React, { useState } from 'react';
import { Card, Space, Button, Tooltip, Empty, Spin } from 'antd';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownloadOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

export interface ChartCardProps {
  title: React.ReactNode;
  subtitle?: string;
  extra?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
  emptyText?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  onRefresh?: () => void;
  onDownload?: () => void;
  showFullscreen?: boolean;
  showDownload?: boolean;
  showRefresh?: boolean;
  info?: string;
  height?: number | string;
  bordered?: boolean;
  hoverable?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  extra,
  loading = false,
  empty = false,
  emptyText = '暂无数据',
  children,
  className = '',
  bodyClassName = '',
  onRefresh,
  onDownload,
  showFullscreen = true,
  showDownload = false,
  showRefresh = false,
  info,
  height,
  bordered = false,
  hoverable = true,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 工具栏按钮
  const toolbarButtons = (
    <Space size={4}>
      {info && (
        <Tooltip title={info}>
          <Button
            type="text"
            size="small"
            icon={<InfoCircleOutlined />}
            className="tw-text-gray-400 hover:tw-text-gray-600"
          />
        </Tooltip>
      )}
      {showRefresh && onRefresh && (
        <Tooltip title="刷新">
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            onClick={onRefresh}
            className="tw-text-gray-400 hover:tw-text-blue-500"
          />
        </Tooltip>
      )}
      {showDownload && onDownload && (
        <Tooltip title="下载">
          <Button
            type="text"
            size="small"
            icon={<DownloadOutlined />}
            onClick={onDownload}
            className="tw-text-gray-400 hover:tw-text-blue-500"
          />
        </Tooltip>
      )}
      {showFullscreen && (
        <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
          <Button
            type="text"
            size="small"
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={handleFullscreen}
            className="tw-text-gray-400 hover:tw-text-blue-500"
          />
        </Tooltip>
      )}
      {extra}
    </Space>
  );

  // 卡片标题区域
  const cardTitle = (
    <div className="tw-flex tw-items-start tw-justify-between tw-w-full">
      <div className="tw-flex-1">
        <div className="tw-text-base tw-font-semibold tw-text-gray-800">{title}</div>
        {subtitle && (
          <div className="tw-text-xs tw-text-gray-500 tw-mt-1 tw-font-normal">{subtitle}</div>
        )}
      </div>
    </div>
  );

  const cardClassName = `
    tw-transition-all tw-duration-300
    ${hoverable ? 'hover:tw-shadow-lg hover:-tw-translate-y-0.5' : ''}
    ${isFullscreen ? 'tw-fixed tw-inset-4 tw-z-50 tw-shadow-2xl' : ''}
    ${className}
  `;

  const bodyStyle = {
    height: height || 'auto',
    padding: '24px',
  };

  return (
    <>
      {isFullscreen && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-z-40 tw-backdrop-blur-sm" />
      )}
      <Card
        title={cardTitle}
        extra={toolbarButtons}
        bordered={bordered}
        className={cardClassName}
        bodyStyle={bodyStyle}
        styles={{
          header: {
            borderBottom: '1px solid #f0f0f0',
            padding: '16px 24px',
          },
          body: {
            padding: '24px',
          },
        }}
      >
        <div className={`tw-relative ${bodyClassName}`}>
          {loading && (
            <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-white/80 tw-backdrop-blur-sm tw-z-10 tw-rounded-lg">
              <Spin size="large" tip="加载中..." />
            </div>
          )}
          {empty && !loading ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-min-h-[300px]">
              <Empty description={emptyText} />
            </div>
          ) : (
            children
          )}
        </div>
      </Card>
    </>
  );
};

export default ChartCard;

