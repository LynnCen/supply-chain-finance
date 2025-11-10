// 数据管理模块类型定义

// 数据类型枚举
export enum DataManagementType {
  TRANSACTION = 'transaction', // 交易数据
  LOAN = 'loan', // 贷款数据
  ENTERPRISE = 'enterprise', // 企业信息
  FINANCIAL = 'financial', // 财务报表
}

// 数据类型标签映射
export const DATA_TYPE_LABELS: Record<DataManagementType, string> = {
  [DataManagementType.TRANSACTION]: '交易数据',
  [DataManagementType.LOAN]: '贷款数据',
  [DataManagementType.ENTERPRISE]: '企业信息',
  [DataManagementType.FINANCIAL]: '财务报表',
};

// 上传文件响应
export interface DataFileUploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  uploadTime: string;
  dataTypes: DataManagementType[]; // 包含的数据类型
  totalCount: number; // 总数据条数
  typeCounts: Record<DataManagementType, number>; // 各类型数据条数
}

// 表格列配置
export interface DataTableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  sorter?: boolean;
  filters?: Array<{ text: string; value: string | number }>;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
}

// 表格数据项（使用 unknown 而不是 any 提升类型安全）
export interface DataListItem {
  id: string;
  [key: string]: unknown;
}

// 表格数据响应
export interface DataListResponse {
  list: DataListItem[];
  total: number;
  columns: DataTableColumn[];
}

// 统计数据
export interface DataStatistics {
  transactionCount: number;
  loanCount: number;
  enterpriseCount: number;
  financialCount: number;
  totalCount: number;
  recentUploadCount: number; // 最近上传数量
  lastUploadTime?: string; // 最后上传时间
}

// 表格查询参数
export interface DataListQueryParams {
  type: DataManagementType;
  page: number;
  pageSize: number;
  keyword?: string;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
}

// 删除数据参数
export interface DeleteDataParams {
  id: string;
  type: DataManagementType;
}

