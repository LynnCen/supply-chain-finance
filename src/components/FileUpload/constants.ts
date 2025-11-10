// 文件上传配置常量

// 支持的文件类型
export const FILE_TYPES = {
  EXCEL: {
    accept: '.xlsx,.xls',
    mimeTypes: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    extensions: ['.xlsx', '.xls'],
  },
  CSV: {
    accept: '.csv',
    mimeTypes: ['text/csv'],
    extensions: ['.csv'],
  },
} as const;

// 默认配置
export const DEFAULT_UPLOAD_CONFIG = {
  maxSize: 5, // MB
  accept: FILE_TYPES.EXCEL.accept,
  multiple: false,
  showUploadList: true,
  listType: 'text' as const,
};

// 文件大小限制（字节）
export const MAX_FILE_SIZE = {
  SMALL: 1 * 1024 * 1024, // 1MB
  MEDIUM: 5 * 1024 * 1024, // 5MB
  LARGE: 10 * 1024 * 1024, // 10MB
  XLARGE: 50 * 1024 * 1024, // 50MB
};

// 错误提示信息
export const ERROR_MESSAGES = {
  FILE_TYPE_ERROR: '文件格式不正确，请上传Excel文件（.xlsx, .xls）',
  FILE_SIZE_ERROR: '文件大小超出限制',
  UPLOAD_FAILED: '文件上传失败，请重试',
  NETWORK_ERROR: '网络错误，请检查网络连接',
};
