import React from 'react';
import { Segmented } from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  FieldTimeOutlined, 
  HistoryOutlined 
} from '@ant-design/icons';
import { TimeRange, TIME_RANGE_LABELS } from '@/types/enterpriseDashboard';

interface TimeRangeFilterProps {
  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
}

/**
 * 时间范围筛选器组件
 * 提供月度、季度、年度和全部时间范围切换
 */
const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  value = TimeRange.MONTH,
  onChange,
}) => {
  const options = [
    {
      label: (
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <ClockCircleOutlined />
          <span>{TIME_RANGE_LABELS[TimeRange.MONTH]}</span>
        </div>
      ),
      value: TimeRange.MONTH,
    },
    {
      label: (
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <CalendarOutlined />
          <span>{TIME_RANGE_LABELS[TimeRange.QUARTER]}</span>
        </div>
      ),
      value: TimeRange.QUARTER,
    },
    {
      label: (
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <FieldTimeOutlined />
          <span>{TIME_RANGE_LABELS[TimeRange.YEAR]}</span>
        </div>
      ),
      value: TimeRange.YEAR,
    },
    {
      label: (
        <div className="tw-flex tw-items-center tw-gap-1.5">
          <HistoryOutlined />
          <span>{TIME_RANGE_LABELS[TimeRange.ALL]}</span>
        </div>
      ),
      value: TimeRange.ALL,
    },
  ];

  return (
    <div className="tw-flex tw-items-center tw-gap-2">
      <span className="tw-text-sm tw-text-gray-600 tw-font-medium">时间范围：</span>
      <Segmented
        value={value}
        onChange={onChange as (value: string | number) => void}
        options={options}
        size="large"
        style={{
          background: '#f0f5ff',
          padding: '2px',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default TimeRangeFilter;

