import { useRequest } from 'ahooks';
import type { Options } from 'ahooks/lib/useRequest/src/types';
import { ENABLE_MOCK } from '@/config';

/**
 * API配置类型
 */
export interface ApiConfig<TData, TParams extends unknown[]> {
  service: (...args: TParams) => Promise<TData>;
  mockData?: TData | ((...args: TParams) => TData | Promise<TData>);
}

/**
 * 扩展的请求配置
 */
export interface QueryOptions<TData, TParams extends unknown[]> extends Options<TData, TParams> {
  mockDelay?: number; // Mock延迟时间（毫秒），默认300ms
}

/**
 * 统一的请求Hook
 * - 开启Mock且配置了mockData时，返回Mock数据
 * - 否则调用真实接口
 * @param apiConfig API配置对象
 * @param options 请求配置
 */
export function useQuery<TData, TParams extends unknown[]>(
  apiConfig: ApiConfig<TData, TParams>,
  options?: QueryOptions<TData, TParams>
) {
  const { mockDelay = 300, ...restOptions } = options || {};

  // 判断是否使用Mock：全局配置开启 且 提供了mockData
  const shouldUseMock = ENABLE_MOCK && apiConfig.mockData !== undefined;

  // 创建统一的service函数
  const finalService = async (...args: TParams): Promise<TData> => {
    if (shouldUseMock) {
      // Mock模式：模拟延迟并返回Mock数据
      await new Promise(resolve => setTimeout(resolve, mockDelay));

      const { mockData } = apiConfig;

      // mockData是函数，执行它
      if (typeof mockData === 'function') {
        const result = (mockData as (...args: TParams) => TData | Promise<TData>)(...args);
        return result instanceof Promise ? result : Promise.resolve(result);
      }

      // mockData是数据，直接返回
      return Promise.resolve(mockData as TData);
    }

    // 真实接口模式
    return apiConfig.service(...args);
  };

  return useRequest(finalService, restOptions);
}

export default useQuery;
