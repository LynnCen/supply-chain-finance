import type { UploadFile, UploadProps } from 'antd';

// 上传状态
export enum UploadStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error',
}

// 上传响应基础类型
export interface UploadResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// 文件信息
export interface FileInfo {
  uid: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status?: UploadStatus;
  percent?: number;
  response?: UploadResponse;
}

// FileUpload组件Props
export interface FileUploadProps {
  // 接受的文件类型，例如：'.xlsx,.xls'
  accept?: string;
  // 最大文件大小（MB）
  maxSize?: number;
  // 是否支持多文件上传
  multiple?: boolean;
  // 上传接口函数
  uploadApi: (file: File) => Promise<UploadResponse>;
  // 上传成功回调
  onSuccess?: (response: UploadResponse, file: File) => void;
  // 上传失败回调
  onError?: (error: Error, file: File) => void;
  // 文件改变回调
  onChange?: (fileList: UploadFile[]) => void;
  // 是否显示上传文件列表
  showUploadList?: boolean;
  // 列表展示类型
  listType?: UploadProps['listType'];
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  className?: string;
  // 最大文件数量
  maxCount?: number;
  // 上传前的校验
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  // 自定义提示文本
  tip?: string;
  // 是否显示拖拽区域
  dragger?: boolean;
}

// 上传组件内部状态
export interface UploadState {
  fileList: UploadFile[];
  uploading: boolean;
  uploadProgress: number;
}
