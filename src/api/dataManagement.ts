import request from '@/utils/request';
import type {
  DataFileUploadResponse,
  DataListResponse,
  DataStatistics,
  DataListQueryParams,
  DeleteDataParams,
} from '@/types/dataManagement';

/**
 * 上传数据文件（Excel）
 */
export function uploadDataFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request.post<DataFileUploadResponse>('/dataManagement/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

/**
 * 获取数据列表
 */
export function getDataList(params: DataListQueryParams) {
  return request.get<DataListResponse>('/dataManagement/list', { params });
}

/**
 * 获取统计数据
 */
export function getDataStatistics() {
  return request.get<DataStatistics>('/dataManagement/statistics');
}

/**
 * 删除数据项
 */
export function deleteDataItem(params: DeleteDataParams) {
  return request.delete<null>(`/dataManagement/${params.id}`, {
    params: { type: params.type },
  });
}

/**
 * 批量删除数据
 */
export function batchDeleteData(ids: string[], type: string) {
  return request.post<null>('/dataManagement/batchDelete', { ids, type });
}

/**
 * 导出数据（下载文件）
 */
export function exportData(type: string) {
  return request.getBlob('/dataManagement/export', {
    params: { type },
  });
}
