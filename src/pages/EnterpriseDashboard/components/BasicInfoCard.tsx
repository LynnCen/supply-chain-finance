import { Card, Descriptions, Tag, Skeleton } from 'antd';
import {
  ShopOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import type { EnterpriseBasicInfo } from '@/types/enterpriseDashboard';

interface BasicInfoCardProps {
  data?: EnterpriseBasicInfo;
  loading?: boolean;
}

/**
 * 企业基本信息卡片组件
 */
const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ data, loading = false }) => {
  // 信用等级颜色映射
  const getCreditRatingColor = (rating: string) => {
    const colorMap: Record<string, string> = {
      AAA: 'green',
      AA: 'blue',
      A: 'orange',
      B: 'red',
    };
    return colorMap[rating] || 'default';
  };

  // 供应链角色颜色映射
  const getChainRoleColor = (role: string) => {
    const colorMap: Record<string, string> = {
      core: 'purple',
      supplier: 'blue',
      distributor: 'cyan',
      logistics: 'orange',
    };
    return colorMap[role] || 'default';
  };

  if (loading) {
    return (
      <Card
        className="tw-border tw-border-gray-200 tw-shadow-sm"
        title={
          <div className="tw-flex tw-items-center">
            <ShopOutlined className="tw-mr-2 tw-text-blue-500" />
            <span>企业基本信息</span>
          </div>
        }
      >
        <Skeleton active paragraph={{ rows: 6 }} />
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card
      className="tw-border tw-border-blue-100 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-bg-gradient-to-br tw-from-white tw-to-blue-50/30 tw-h-full"
      bodyStyle={{ padding: '16px' }}
      title={
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-items-center">
            <ShopOutlined className="tw-mr-2 tw-text-blue-500" />
            <span>企业基本信息</span>
          </div>
          <div className="tw-flex tw-gap-2">
            <Tag
              color={getCreditRatingColor(data.creditRating)}
              icon={<SafetyCertificateOutlined />}
            >
              {data.creditRating}
            </Tag>
            <Tag color={getChainRoleColor(data.chainRole)}>{data.chainRoleLabel}</Tag>
          </div>
        </div>
      }
    >
      <Descriptions column={2} bordered size="small">
        <Descriptions.Item
          label={
            <span>
              <ShopOutlined className="tw-mr-1" />
              企业名称
            </span>
          }
          span={2}
        >
          <span className="tw-font-semibold">{data.enterpriseName}</span>
        </Descriptions.Item>
        <Descriptions.Item label="统一社会信用代码" span={2}>
          {data.creditCode}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <UserOutlined className="tw-mr-1" />
              法人代表
            </span>
          }
        >
          {data.legalPerson}
        </Descriptions.Item>
        <Descriptions.Item label="注册资本">
          <span className="tw-font-semibold tw-text-blue-600">
            {data.registeredCapital.toLocaleString()} 万元
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="所属行业">{data.industryLabel}</Descriptions.Item>
        <Descriptions.Item label="注册日期">{data.registerDate}</Descriptions.Item>
        <Descriptions.Item label="成立年限">
          <span className="tw-font-semibold tw-text-purple-600">{data.establishedYears} 年</span>
        </Descriptions.Item>
        <Descriptions.Item label="员工规模">{data.employeeCount}</Descriptions.Item>
        <Descriptions.Item label="经营状态">
          <span className="tw-font-semibold tw-text-green-600">{data.businessStatus}</span>
        </Descriptions.Item>
        <Descriptions.Item label="供应链角色">{data.chainRoleLabel}</Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <PhoneOutlined className="tw-mr-1" />
              联系电话
            </span>
          }
        >
          {data.contactPhone}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <MailOutlined className="tw-mr-1" />
              联系邮箱
            </span>
          }
        >
          {data.contactEmail}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <EnvironmentOutlined className="tw-mr-1" />
              联系地址
            </span>
          }
          span={2}
        >
          {data.contactAddress}
        </Descriptions.Item>
        <Descriptions.Item label="主营业务" span={2}>
          <span className="tw-text-gray-700">{data.mainBusiness}</span>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BasicInfoCard;
