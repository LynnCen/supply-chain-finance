import { Modal } from 'antd';
import {
  UploadOutlined,
  FileExcelOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import FileUpload from '@/components/FileUpload';
import { uploadDataFile } from '@/api/dataManagement';
import type { UploadResponse } from '@/components/FileUpload/types';
import type { DataFileUploadResponse } from '@/types/dataManagement';

interface UploadModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: (response: DataFileUploadResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * 数据上传弹窗组件
 * 以弹窗形式提供文件上传功能，支持Excel文件上传
 */
const UploadModal: React.FC<UploadModalProps> = ({ open, onCancel, onSuccess, onError }) => {
  const handleUploadSuccess = (response: UploadResponse, _file: File) => {
    if (response.code === 0) {
      onSuccess?.(response.data as DataFileUploadResponse);
      // 上传成功后自动关闭弹窗
      onCancel();
    }
  };

  const handleUploadError = (error: Error, _file: File) => {
    onError?.(error);
  };

  return (
    <Modal
      title={
        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-lg tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 tw-shadow-md">
            <UploadOutlined className="tw-text-white tw-text-lg" />
          </div>
          <div>
            <div className="tw-text-lg tw-font-semibold tw-text-gray-900">数据上传</div>
            <div className="tw-text-xs tw-font-normal tw-text-gray-500">智能识别，快速导入</div>
          </div>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={750}
      destroyOnClose
      centered
      className="tw-upload-modal"
    >
      <div className="tw-space-y-5 tw-pt-3 ">
        {/* 特性说明卡片 */}
        <div className=" tw-grid tw-grid-cols-2 tw-gap-3">
          <div className="tw-flex tw-items-start tw-gap-3 tw-p-3.5 tw-bg-blue-50 tw-rounded-lg tw-border tw-border-blue-100">
            <FileExcelOutlined className="tw-text-blue-500 tw-text-lg tw-mt-0.5" />
            <div>
              <div className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-0.5">
                支持Excel文件
              </div>
              <div className="tw-text-xs tw-text-gray-600">.xlsx、.xls 格式</div>
            </div>
          </div>

          <div className="tw-flex tw-items-start tw-gap-3 tw-p-3.5 tw-bg-green-50 tw-rounded-lg tw-border tw-border-green-100">
            <ThunderboltOutlined className="tw-text-green-500 tw-text-lg tw-mt-0.5" />
            <div>
              <div className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-0.5">智能识别</div>
              <div className="tw-text-xs tw-text-gray-600">自动分类数据类型</div>
            </div>
          </div>

          <div className="tw-flex tw-items-start tw-gap-3 tw-p-3.5 tw-bg-purple-50 tw-rounded-lg tw-border tw-border-purple-100">
            <SafetyOutlined className="tw-text-purple-500 tw-text-lg tw-mt-0.5" />
            <div>
              <div className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-0.5">安全可靠</div>
              <div className="tw-text-xs tw-text-gray-600">文件大小 ≤ 5MB</div>
            </div>
          </div>

          <div className="tw-flex tw-items-start tw-gap-3 tw-p-3.5 tw-bg-orange-50 tw-rounded-lg tw-border tw-border-orange-100">
            <CheckCircleOutlined className="tw-text-orange-500 tw-text-lg tw-mt-0.5" />
            <div>
              <div className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-0.5">多种数据</div>
              <div className="tw-text-xs tw-text-gray-600">交易/贷款/企业/财务</div>
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="tw-flex tw-items-center tw-justify-center tw-py-3">
          <span className="tw-flex-shrink tw-px-4 tw-text-sm tw-font-medium tw-text-gray-700">
            开始上传
          </span>
        </div>

        {/* 上传组件 */}
        <FileUpload
          accept=".xlsx,.xls"
          maxSize={5}
          uploadApi={uploadDataFile}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
          tip="拖拽文件到此处，或点击选择文件上传"
          dragger={true}
          maxCount={1}
        />

        {/* 底部提示 */}
        <div className="tw-flex tw-items-start tw-gap-2.5 tw-p-3.5 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-200">
          <div className="tw-text-base tw-mt-0.5">💡</div>
          <div className="tw-text-xs tw-text-gray-600 tw-leading-relaxed">
            上传文件后，系统会自动识别数据类型（交易记录、贷款记录、企业信息、财务报表），
            并在对应的标签页中展示。请确保Excel文件格式正确，包含必要的数据列。
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
