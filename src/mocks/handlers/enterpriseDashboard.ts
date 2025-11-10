import { http, HttpResponse } from 'msw';
import mockData from '../data/enterpriseDashboard.json';

export const enterpriseDashboardHandlers = [
  // 获取企业列表
  http.get('/api/enterpriseDashboard/enterprises', () => {
    return HttpResponse.json({
      code: 0,
      data: {
        enterprises: mockData.enterpriseList,
        total: mockData.enterpriseList.length,
      },
      message: 'success',
    });
  }),

  // 获取企业基本信息
  http.get('/api/enterpriseDashboard/basicInfo', ({ request }) => {
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId');

    if (!enterpriseId) {
      return HttpResponse.json(
        {
          code: 1001,
          data: null,
          message: '企业ID不能为空',
        },
        { status: 400 }
      );
    }

    const basicInfo =
      mockData.enterpriseBasicInfo[enterpriseId as keyof typeof mockData.enterpriseBasicInfo];

    if (!basicInfo) {
      return HttpResponse.json(
        {
          code: 1002,
          data: null,
          message: '企业不存在',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      code: 0,
      data: basicInfo,
      message: 'success',
    });
  }),

  // 获取财务健康数据
  http.get('/api/enterpriseDashboard/financialHealth', ({ request }) => {
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId');
    const timeRange = url.searchParams.get('timeRange') || 'month';

    if (!enterpriseId) {
      return HttpResponse.json(
        {
          code: 1001,
          data: null,
          message: '企业ID不能为空',
        },
        { status: 400 }
      );
    }

    const enterpriseData =
      mockData.financialHealth[enterpriseId as keyof typeof mockData.financialHealth];

    if (!enterpriseData) {
      return HttpResponse.json(
        {
          code: 1002,
          data: null,
          message: '企业财务数据不存在',
        },
        { status: 404 }
      );
    }

    const metrics = enterpriseData[timeRange as keyof typeof enterpriseData];

    if (!metrics) {
      return HttpResponse.json(
        {
          code: 1003,
          data: null,
          message: '时间范围参数无效',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 0,
      data: {
        enterpriseId,
        timeRange,
        metrics,
        updateTime: new Date().toISOString(),
      },
      message: 'success',
    });
  }),

  // 获取交易趋势数据
  http.get('/api/enterpriseDashboard/transactionTrend', ({ request }) => {
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId');
    const timeRange = url.searchParams.get('timeRange') || 'month';

    if (!enterpriseId) {
      return HttpResponse.json(
        {
          code: 1001,
          data: null,
          message: '企业ID不能为空',
        },
        { status: 400 }
      );
    }

    const enterpriseData =
      mockData.transactionTrend[enterpriseId as keyof typeof mockData.transactionTrend];

    if (!enterpriseData) {
      return HttpResponse.json(
        {
          code: 1002,
          data: null,
          message: '企业交易数据不存在',
        },
        { status: 404 }
      );
    }

    const trendData = enterpriseData[timeRange as keyof typeof enterpriseData];

    if (!trendData) {
      return HttpResponse.json(
        {
          code: 1003,
          data: null,
          message: '时间范围参数无效',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 0,
      data: {
        enterpriseId,
        timeRange,
        data: trendData,
      },
      message: 'success',
    });
  }),

  // 获取订单统计数据
  http.get('/api/enterpriseDashboard/orderStatistics', ({ request }) => {
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId');
    const timeRange = url.searchParams.get('timeRange') || 'month';

    if (!enterpriseId) {
      return HttpResponse.json(
        {
          code: 1001,
          data: null,
          message: '企业ID不能为空',
        },
        { status: 400 }
      );
    }

    const enterpriseData =
      mockData.orderStatistics[enterpriseId as keyof typeof mockData.orderStatistics];

    if (!enterpriseData) {
      return HttpResponse.json(
        {
          code: 1002,
          data: null,
          message: '企业订单数据不存在',
        },
        { status: 404 }
      );
    }

    const orderData = enterpriseData[timeRange as keyof typeof enterpriseData];

    if (!orderData) {
      return HttpResponse.json(
        {
          code: 1003,
          data: null,
          message: '时间范围参数无效',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      code: 0,
      data: {
        enterpriseId,
        timeRange,
        data: orderData,
      },
      message: 'success',
    });
  }),

  // 获取合作伙伴列表
  http.get('/api/enterpriseDashboard/partners', ({ request }) => {
    const url = new URL(request.url);
    const enterpriseId = url.searchParams.get('enterpriseId');

    if (!enterpriseId) {
      return HttpResponse.json(
        {
          code: 1001,
          data: null,
          message: '企业ID不能为空',
        },
        { status: 400 }
      );
    }

    const partners = mockData.partners[enterpriseId as keyof typeof mockData.partners];

    if (!partners) {
      return HttpResponse.json(
        {
          code: 1002,
          data: null,
          message: '企业合作伙伴数据不存在',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      code: 0,
      data: {
        enterpriseId,
        partners,
        total: partners.length,
      },
      message: 'success',
    });
  }),

  // 获取企业排行榜
  http.get('/api/enterpriseDashboard/ranking', () => {
    return HttpResponse.json({
      code: 0,
      data: {
        rankings: mockData.enterpriseRanking,
        updateTime: new Date().toISOString(),
      },
      message: 'success',
    });
  }),
];

