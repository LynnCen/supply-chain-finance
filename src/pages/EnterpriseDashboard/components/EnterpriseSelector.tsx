import { Select, Tag } from 'antd';
import { SearchOutlined, BankOutlined } from '@ant-design/icons';
import type { EnterpriseListItem } from '@/types/enterpriseDashboard';

interface EnterpriseSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  enterprises: EnterpriseListItem[];
  loading?: boolean;
}

/**
 * 企业选择器组件
 * 支持搜索和筛选企业
 */
const EnterpriseSelector: React.FC<EnterpriseSelectorProps> = ({
  value,
  onChange,
  enterprises,
  loading = false,
}) => {
  // 信用等级颜色映射
  const getCreditRatingColor = (rating: string) => {
    if (rating === 'AAA') return 'gold';
    if (rating === 'AA') return 'blue';
    if (rating === 'A') return 'green';
    return 'default';
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      loading={loading}
      showSearch
      placeholder={
        <span className="tw-flex tw-items-center tw-text-gray-400">
          <SearchOutlined className="tw-mr-2" />
          搜索或选择企业
        </span>
      }
      optionFilterProp="label"
      suffixIcon={<SearchOutlined className="tw-text-blue-500" />}
      className="tw-w-full"
      size="large"
      style={{
        borderRadius: '8px',
      }}
      popupClassName="tw-rounded-lg"
      options={enterprises.map(enterprise => ({
        label: (
          <div className="tw-flex tw-items-center tw-justify-between tw-py-1">
            <div className="tw-flex tw-items-center tw-flex-1">
              <BankOutlined className="tw-text-blue-500 tw-mr-2" />
              <span className="tw-font-medium">{enterprise.name}</span>
            </div>
            <Tag color={getCreditRatingColor(enterprise.creditRating)} className="tw-ml-2 tw-text-xs">
              {enterprise.creditRating}
            </Tag>
          </div>
        ),
        value: enterprise.id,
        searchLabel: enterprise.name,
      }))}
      filterOption={(input, option) => {
        const searchLabel = option?.searchLabel as string;
        return searchLabel?.toLowerCase().includes(input.toLowerCase()) || false;
      }}
    />
  );
};

export default EnterpriseSelector;

