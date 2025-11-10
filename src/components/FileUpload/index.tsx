import { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import type { FileUploadProps, UploadResponse } from './types';
import { DEFAULT_UPLOAD_CONFIG, ERROR_MESSAGES } from './constants';

const { Dragger } = Upload;

/**
 * 公共文件上传组件
 * 支持拖拽上传、文件类型校验、大小限制等功能
 */
const FileUpload: React.FC<FileUploadProps> = ({
  accept = DEFAULT_UPLOAD_CONFIG.accept,
  maxSize = DEFAULT_UPLOAD_CONFIG.maxSize,
  multiple = DEFAULT_UPLOAD_CONFIG.multiple,
  uploadApi,
  onSuccess,
  onError,
  onChange,
  showUploadList = DEFAULT_UPLOAD_CONFIG.showUploadList,
  listType = DEFAULT_UPLOAD_CONFIG.listType,
  disabled = false,
  className = '',
  maxCount = 1,
  beforeUpload,
  tip,
  dragger = true,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 文件类型校验
  const validateFileType = (file: File): boolean => {
    if (!accept) return true;

    const acceptedExtensions = accept.split(',').map(ext => ext.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    return acceptedExtensions.includes(fileExtension);
  };

  // 文件大小校验
  const validateFileSize = (file: File): boolean => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    return file.size <= maxSizeBytes;
  };

  // 上传前校验
  const handleBeforeUpload = async (file: File): Promise<boolean> => {
    // 文件类型校验
    if (!validateFileType(file)) {
      message.error(ERROR_MESSAGES.FILE_TYPE_ERROR);
      return false;
    }

    // 文件大小校验
    if (!validateFileSize(file)) {
      message.error(`${ERROR_MESSAGES.FILE_SIZE_ERROR}，最大支持${maxSize}MB`);
      return false;
    }

    // 自定义校验
    if (beforeUpload) {
      try {
        const result = await beforeUpload(file);
        return result;
      } catch {
        return false;
      }
    }

    return true;
  };

  // 自定义上传请求
  const handleCustomRequest: UploadProps['customRequest'] = async options => {
    const { file, onSuccess: onUploadSuccess, onError: onUploadError, onProgress } = options;

    setUploading(true);

    try {
      // 模拟上传进度
      onProgress?.({ percent: 30 });

      // 调用上传接口
      const response: UploadResponse = await uploadApi(file as File);

      onProgress?.({ percent: 100 });

      // 上传成功
      if (response.code === 0) {
        message.success('上传成功');
        onUploadSuccess?.(response);
        onSuccess?.(response, file as File);
      } else {
        throw new Error(response.message || ERROR_MESSAGES.UPLOAD_FAILED);
      }
    } catch (_error) {
      const err = _error as Error;
      message.error(err.message || ERROR_MESSAGES.UPLOAD_FAILED);
      onUploadError?.(err);
      onError?.(err, file as File);
    } finally {
      setUploading(false);
    }
  };

  // 文件列表改变
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  // 移除文件
  const handleRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple,
    accept,
    fileList,
    maxCount,
    disabled: disabled || uploading,
    showUploadList,
    listType,
    beforeUpload: handleBeforeUpload,
    customRequest: handleCustomRequest,
    onChange: handleChange,
    onRemove: handleRemove,
  };

  const uploadContent = (
    <div className="tw-py-8">
      <p className="ant-upload-drag-icon">
        <InboxOutlined className="tw-text-5xl tw-text-blue-500" />
      </p>
      <p className="ant-upload-text tw-text-base tw-text-gray-700 tw-font-medium">
        点击或拖拽文件到此区域上传
      </p>
      <p className="ant-upload-hint tw-text-sm tw-text-gray-500 tw-mt-2">
        {tip || `支持${accept}格式，单个文件不超过${maxSize}MB`}
      </p>
    </div>
  );

  const buttonContent = (
    <div>
      <UploadOutlined className="tw-mr-2" />
      {uploading ? '上传中...' : '选择文件'}
    </div>
  );

  if (dragger) {
    return (
      <Dragger
        {...uploadProps}
        className={`tw-border-[0px] tw-border-dashed tw-rounded-lg hover:tw-border-blue-500 tw-transition-colors ${className}`}
      >
        {uploadContent}
      </Dragger>
    );
  }

  return (
    <Upload {...uploadProps} className={className}>
      {fileList.length < maxCount && buttonContent}
    </Upload>
  );
};

export default FileUpload;
