import { Card, Table, Tag, Badge } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Partner } from '@/types/enterpriseDashboard';

interface PartnerTableProps {
  data?: Partner[];
  loading?: boolean;
}

/**
 * 合作伙伴表格组件
 * 展示企业的供应商和客户信息
 */
const PartnerTable: React.FC<PartnerTableProps> = ({ data = [], loading = false }) => {
  const columns: ColumnsType<Partner> = [
    {
      title: '合作伙伴名称',
      dataIndex: 'partnerName',
      key: 'partnerName',
      width: 250,
      ellipsis: true,
      fixed: 'left',
      render: (text: string) => (
        <span className="tw-font-semibold tw-text-gray-900">{text}</span>
      ),
    },
    {
      title: '合作类型',
      dataIndex: 'partnerTypeLabel',
      key: 'partnerType',
      width: 100,
      align: 'center',
      filters: [
        { text: '供应商', value: 'supplier' },
        { text: '客户', value: 'customer' },
      ],
      onFilter: (value, record) => record.partnerType === value,
      render: (text: string, record: Partner) => {
        const color = record.partnerType === 'supplier' ? 'blue' : 'green';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '合作年限',
      dataIndex: 'cooperationYears',
      key: 'cooperationYears',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.cooperationYears - b.cooperationYears,
      render: (years: number) => (
        <span className="tw-text-gray-700">{years} 年</span>
      ),
    },
    {
      title: '累计交易金额',
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
      width: 150,
      align: 'right',
      sorter: (a, b) => a.transactionAmount - b.transactionAmount,
      render: (amount: number) => (
        <span className="tw-font-semibold tw-text-blue-600">
          {(amount / 10000).toLocaleString()} 万元
        </span>
      ),
    },
    {
      title: '累计交易笔数',
      dataIndex: 'transactionCount',
      key: 'transactionCount',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.transactionCount - b.transactionCount,
      render: (count: number) => (
        <span className="tw-text-gray-700">{count.toLocaleString()} 笔</span>
      ),
    },
    {
      title: '信用等级',
      dataIndex: 'creditRating',
      key: 'creditRating',
      width: 100,
      align: 'center',
      filters: [
        { text: 'AAA', value: 'AAA' },
        { text: 'AA', value: 'AA' },
        { text: 'A', value: 'A' },
      ],
      onFilter: (value, record) => record.creditRating === value,
      render: (rating: string) => {
        const colorMap: Record<string, string> = {
          AAA: 'green',
          AA: 'blue',
          A: 'orange',
        };
        return <Tag color={colorMap[rating] || 'default'}>{rating}</Tag>;
      },
    },
    {
      title: '最后交易日期',
      dataIndex: 'lastTransactionDate',
      key: 'lastTransactionDate',
      width: 130,
      align: 'center',
      sorter: (a, b) => a.lastTransactionDate.localeCompare(b.lastTransactionDate),
      render: (date: string) => (
        <span className="tw-text-gray-600">{date}</span>
      ),
    },
    {
      title: '合作状态',
      dataIndex: 'statusLabel',
      key: 'status',
      width: 100,
      align: 'center',
      fixed: 'right',
      filters: [
        { text: '合作中', value: 'active' },
        { text: '暂停合作', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text: string, record: Partner) => {
        const statusText = record.status === 'active' ? 'processing' : 'default';
        return <Badge status={statusText} text={text} />;
      },
    },
  ];

  return (
    <Card
      className="tw-border tw-border-orange-100 tw-shadow-sm hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-bg-gradient-to-br tw-from-white tw-to-orange-50/20"
      bodyStyle={{ padding: '16px' }}
      title={
        <div className="tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-items-center">
            <TeamOutlined className="tw-mr-2 tw-text-orange-500" />
            <span>合作伙伴网络</span>
          </div>
          <span className="tw-text-sm tw-text-gray-500">
            共 {data.length} 家合作伙伴
          </span>
        </div>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          size: 'default',
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </Card>
  );
};

export default PartnerTable;

