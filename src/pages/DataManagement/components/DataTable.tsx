import { useState } from 'react';
import { Table, Card, Input, Button, Space, Popconfirm, message, Tag } from 'antd';
import { useBoolean, useMemoizedFn } from 'ahooks';
import {
  SearchOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { useTableData } from '../hooks/useTableData';
import { deleteDataItem, exportData } from '@/api/dataManagement';
import type { DataManagementType, DataTableColumn, DataListItem } from '@/types/dataManagement';
import type { ColumnsType } from 'antd/es/table';

interface DataTableProps {
  dataType: DataManagementType;
  onRefresh?: () => void;
}

/**
 * 数据表格组件
 * 支持搜索、分页、排序、筛选、删除、导出等功能
 */
const DataTable: React.FC<DataTableProps> = ({ dataType, onRefresh }) => {
  const [searchValue, setSearchValue] = useState('');
  const [deleting, { setTrue: setDeleting, setFalse: setDeletingDone }] = useBoolean(false);
  const [exporting, { setTrue: setExporting, setFalse: setExportingDone }] = useBoolean(false);

  const {
    list,
    columns: apiColumns,
    total,
    loading,
    page,
    pageSize,
    keyword,
    refresh,
    handlePageChange,
    handleSearch,
    handleClearSearch,
  } = useTableData({ dataType });

  // 立即搜索
  const onSearch = useMemoizedFn(() => {
    handleSearch(searchValue);
  });

  // 清空搜索
  const onClearSearch = useMemoizedFn(() => {
    setSearchValue('');
    handleClearSearch();
  });

  // 刷新表格
  const onRefreshTable = useMemoizedFn(() => {
    refresh();
    onRefresh?.();
  });

  // 删除数据项
  const handleDelete = useMemoizedFn(async (id: string) => {
    try {
      setDeleting();
      await deleteDataItem({ id, type: dataType });
      message.success('删除成功');
      refresh();
      onRefresh?.();
    } catch {
      message.error('删除失败');
    } finally {
      setDeletingDone();
    }
  });

  // 导出数据
  const handleExport = useMemoizedFn(async () => {
    try {
      setExporting();
      const blob = await exportData(dataType);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dataType}-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('导出成功');
    } catch {
      message.error('导出失败');
    } finally {
      setExportingDone();
    }
  });

  // 构建表格列配置（类型已从后端明确定义，无需断言）
  const tableColumns: ColumnsType<DataListItem> = [
    ...(apiColumns || []).map((col: DataTableColumn) => ({
      ...col,
      render: (text: unknown) => {
        const dataIndex = col.dataIndex;
        // 状态字段特殊处理
        if (dataIndex === 'status') {
          const statusMap: Record<string, { color: string; text: string }> = {
            pending: { color: 'orange', text: '待确认' },
            completed: { color: 'green', text: '已完成' },
            cancelled: { color: 'red', text: '已取消' },
            disbursed: { color: 'blue', text: '已放款' },
            repaying: { color: 'cyan', text: '还款中' },
          };
          const textStr = String(text);
          const status = statusMap[textStr] || { color: 'default', text: textStr };
          return <Tag color={status.color}>{status.text}</Tag>;
        }
        // 金额字段格式化
        if (
          dataIndex.includes('amount') ||
          dataIndex.includes('Amount') ||
          dataIndex === 'revenue' ||
          dataIndex === 'profit' ||
          dataIndex === 'assets' ||
          dataIndex === 'liabilities' ||
          dataIndex === 'registeredCapital'
        ) {
          return text ? `¥${Number(text).toLocaleString()}` : '-';
        }
        return text || '-';
      },
    })),
    {
      key: 'action',
      title: '操作',
      fixed: 'right',
      width: 150,
      render: (_: unknown, record: DataListItem) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          <Popconfirm
            title="确定删除这条数据吗？"
            onConfirm={() => handleDelete(String(record.id))}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />} loading={deleting}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className="tw-border tw-border-gray-200 tw-shadow-sm">
      {/* 工具栏 */}
      <div className="tw-mb-4 tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-between tw-items-start sm:tw-items-center">
        <Space.Compact className="tw-w-full sm:tw-w-96">
          <Input
            placeholder="搜索关键词"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onPressEnter={onSearch}
            allowClear
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
            搜索
          </Button>
        </Space.Compact>

        <Space wrap>
          {keyword && <Button onClick={onClearSearch}>清空搜索</Button>}
          <Button icon={<ReloadOutlined />} onClick={onRefreshTable}>
            刷新
          </Button>
          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            loading={exporting}
          >
            导出
          </Button>
        </Space>
      </div>

      {/* 数据表格 */}
      <Table
        columns={tableColumns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: handlePageChange,
        }}
        scroll={{ x: 'max-content' }}
        size="middle"
      />
    </Card>
  );
};

export default DataTable;
