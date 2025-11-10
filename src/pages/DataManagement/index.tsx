import { useRequest, useSetState, useMemoizedFn, useBoolean } from 'ahooks';
import { message, Button } from 'antd';
import {
  TransactionOutlined,
  BankOutlined,
  ShopOutlined,
  FileTextOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import StatisticsCards from './components/StatisticsCards';
import UploadModal from './components/UploadModal';
import DataTabs from './components/DataTabs';
import DataTable from './components/DataTable';
import { getDataStatistics } from '@/api/dataManagement';
import { DataManagementType, DATA_TYPE_LABELS } from '@/types/dataManagement';
import type { DataFileUploadResponse } from '@/types/dataManagement';
import type { TabItem } from './types';

interface PageState {
  activeTab: DataManagementType;
  refreshTrigger: number;
}

/**
 * 数据管理主页面
 * 支持Excel文件上传和多种数据类型的分tab展示
 */
const DataManagement = () => {
  const [state, setState] = useSetState<PageState>({
    activeTab: DataManagementType.TRANSACTION,
    refreshTrigger: 0,
  });

  // 上传弹窗状态
  const [uploadModalOpen, { setTrue: openUploadModal, setFalse: closeUploadModal }] =
    useBoolean(false);

  // 获取统计数据
  const {
    data: statisticsData,
    loading: statisticsLoading,
    refresh: refreshStatistics,
  } = useRequest(getDataStatistics, {
    onError: error => {
      console.error('获取统计数据失败:', error);
    },
  });

  // 自动类型推导，无需类型断言
  const statistics = statisticsData?.data;

  // Tab配置
  const tabs: TabItem[] = [
    {
      key: DataManagementType.TRANSACTION,
      label: DATA_TYPE_LABELS[DataManagementType.TRANSACTION],
      count: statistics?.transactionCount || 0,
      icon: <TransactionOutlined />,
    },
    {
      key: DataManagementType.LOAN,
      label: DATA_TYPE_LABELS[DataManagementType.LOAN],
      count: statistics?.loanCount || 0,
      icon: <BankOutlined />,
    },
    {
      key: DataManagementType.ENTERPRISE,
      label: DATA_TYPE_LABELS[DataManagementType.ENTERPRISE],
      count: statistics?.enterpriseCount || 0,
      icon: <ShopOutlined />,
    },
    {
      key: DataManagementType.FINANCIAL,
      label: DATA_TYPE_LABELS[DataManagementType.FINANCIAL],
      count: statistics?.financialCount || 0,
      icon: <FileTextOutlined />,
    },
  ];

  // 上传成功回调
  const handleUploadSuccess = useMemoizedFn((response: DataFileUploadResponse) => {
    message.success(`文件上传成功！共解析 ${response.totalCount} 条数据`);
    // 刷新统计数据
    refreshStatistics();
    // 触发表格刷新
    setState({ refreshTrigger: state.refreshTrigger + 1 });
  });

  // 上传失败回调
  const handleUploadError = useMemoizedFn((error: Error) => {
    message.error(`上传失败：${error.message}`);
  });

  // Tab切换
  const handleTabChange = useMemoizedFn((key: string) => {
    setState({ activeTab: key as DataManagementType });
  });

  // 表格刷新回调
  const handleTableRefresh = useMemoizedFn(() => {
    refreshStatistics();
  });

  return (
    <div className="tw-space-y-6">
      {/* 页面标题 */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">数据管理</h1>
          <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
            上传和管理交易记录、贷款记录、企业信息、财务报表等核心业务数据
          </p>
        </div>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={openUploadModal}
          size="large"
          className="tw-shadow-md"
        >
          上传数据
        </Button>
      </div>

      {/* 统计卡片 */}
      <StatisticsCards statistics={statistics} loading={statisticsLoading} />

      {/* 上传弹窗 */}
      <UploadModal
        open={uploadModalOpen}
        onCancel={closeUploadModal}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      />

      {/* 数据展示区域 */}
      <div className="tw-space-y-4">
        {/* Tab导航 */}
        <DataTabs tabs={tabs} activeKey={state.activeTab} onChange={handleTabChange} />

        {/* 数据表格 */}
        <DataTable
          key={`${state.activeTab}-${state.refreshTrigger}`}
          dataType={state.activeTab}
          onRefresh={handleTableRefresh}
        />
      </div>
    </div>
  );
};

export default DataManagement;
