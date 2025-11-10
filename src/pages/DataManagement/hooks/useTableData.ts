import { useRequest, useSetState } from 'ahooks';
import { getDataList } from '@/api/dataManagement';
import type { DataManagementType } from '@/types/dataManagement';

interface UseTableDataOptions {
  dataType: DataManagementType;
  defaultPageSize?: number;
}

interface TableState {
  page: number;
  pageSize: number;
  keyword: string;
}

/**
 * 表格数据管理Hook
 * 封装表格数据获取、分页、搜索等逻辑
 */
export function useTableData({ dataType, defaultPageSize = 10 }: UseTableDataOptions) {
  const [state, setState] = useSetState<TableState>({
    page: 1,
    pageSize: defaultPageSize,
    keyword: '',
  });

  // 获取表格数据
  const {
    data: tableData,
    loading,
    refresh,
    error,
  } = useRequest(
    () =>
      getDataList({
        type: dataType,
        page: state.page,
        pageSize: state.pageSize,
        keyword: state.keyword,
      }),
    {
      refreshDeps: [dataType, state.page, state.pageSize, state.keyword],
      onError: err => {
        console.error('获取表格数据失败:', err);
      },
    }
  );

  // 处理页码变化
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    if (newPageSize && newPageSize !== state.pageSize) {
      // 改变每页条数时重置到第一页
      setState({ page: 1, pageSize: newPageSize });
    } else {
      setState({ page: newPage });
    }
  };

  // 处理搜索
  const handleSearch = (searchKeyword: string) => {
    setState({ keyword: searchKeyword, page: 1 });
  };

  // 清空搜索
  const handleClearSearch = () => {
    setState({ keyword: '', page: 1 });
  };

  // 重置分页
  const resetPagination = () => {
    setState({
      page: 1,
      pageSize: defaultPageSize,
      keyword: '',
    });
  };

  return {
    // 数据
    list: tableData?.data?.list || [],
    columns: tableData?.data?.columns || [],
    total: tableData?.data?.total || 0,

    // 状态
    loading,
    error,

    // 分页
    page: state.page,
    pageSize: state.pageSize,

    // 搜索
    keyword: state.keyword,

    // 操作方法
    refresh,
    handlePageChange,
    handleSearch,
    handleClearSearch,
    resetPagination,
  };
}
