import { http, HttpResponse } from 'msw';
import mockData from '../data/dataManagement.json';

export const dataManagementHandlers = [
  // 上传Excel文件
  http.post('/api/dataManagement/upload', async ({ request }) => {
    // 模拟上传延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return HttpResponse.json(
        {
          code: 1001,
          data: null,
          message: '请选择要上传的文件',
        },
        { status: 400 }
      );
    }

    // 模拟文件解析结果
    return HttpResponse.json({
      code: 0,
      data: {
        fileId: 'file-' + Date.now(),
        fileName: file.name,
        fileSize: file.size,
        uploadTime: new Date().toISOString(),
        dataTypes: ['transaction', 'loan', 'enterprise', 'financial'],
        totalCount: 156,
        typeCounts: {
          transaction: 45,
          loan: 23,
          enterprise: 38,
          financial: 50,
        },
      },
      message: '上传成功',
    });
  }),

  // 获取数据列表
  http.get('/api/dataManagement/list', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'transaction';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const keyword = url.searchParams.get('keyword') || '';

    // 根据类型获取对应数据
    const typeData = mockData[type as keyof typeof mockData] as {
      columns: Array<Record<string, unknown>>;
      data: Array<Record<string, unknown>>;
    };

    if (!typeData || type === 'statistics') {
      return HttpResponse.json(
        {
          code: 1002,
          data: null,
          message: '数据类型不存在',
        },
        { status: 404 }
      );
    }

    let filteredData = typeData.data;

    // 关键词搜索（简单实现：搜索所有字段）
    if (keyword) {
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    // 分页
    const total = filteredData.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = filteredData.slice(start, end);

    return HttpResponse.json({
      code: 0,
      data: {
        list,
        total,
        columns: typeData.columns,
      },
      message: 'success',
    });
  }),

  // 获取统计数据
  http.get('/api/dataManagement/statistics', () => {
    return HttpResponse.json({
      code: 0,
      data: mockData.statistics,
      message: 'success',
    });
  }),

  // 删除数据项
  http.delete('/api/dataManagement/:id', ({ params }) => {
    const { id } = params;

    // 模拟删除延迟
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            code: 0,
            data: null,
            message: `数据项 ${id} 删除成功`,
          })
        );
      }, 500);
    });
  }),

  // 批量删除数据
  http.post('/api/dataManagement/batchDelete', async ({ request }) => {
    const data = (await request.json()) as { ids: string[]; type: string };

    // 模拟批量删除延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    return HttpResponse.json({
      code: 0,
      data: null,
      message: `成功删除 ${data.ids.length} 条数据`,
    });
  }),

  // 导出数据
  http.get('/api/dataManagement/export', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'transaction';

    // 模拟导出CSV文件
    const csvContent = `数据类型,${type}\n导出时间,${new Date().toLocaleString()}\n`;

    return new HttpResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${type}-${Date.now()}.csv"`,
      },
    });
  }),
];
