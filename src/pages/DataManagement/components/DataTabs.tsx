import { Tabs, Badge } from 'antd';
import type { TabItem } from '../types';

interface DataTabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

/**
 * 数据Tab导航组件
 * 支持多个数据类型的切换展示
 */
const DataTabs: React.FC<DataTabsProps> = ({ tabs, activeKey, onChange, className = '' }) => {
  const tabItems = tabs.map((tab) => ({
    key: tab.key,
    label: (
      <div className="tw-flex tw-items-center tw-gap-2">
        {tab.icon}
        <span>{tab.label}</span>
        <Badge
          count={tab.count}
          showZero
          style={{
            backgroundColor: activeKey === tab.key ? '#1890ff' : '#d9d9d9',
          }}
        />
      </div>
    ),
  }));

  return (
    <Tabs
      activeKey={activeKey}
      items={tabItems}
      onChange={onChange}
      className={`tw-bg-white tw-rounded-lg tw-border tw-border-gray-200 tw-p-4 ${className}`}
      type="card"
      size="large"
    />
  );
};

export default DataTabs;

