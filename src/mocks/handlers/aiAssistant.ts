import { http, HttpResponse, delay } from 'msw';
import mockData from '../data/aiAssistant.json';

export const aiAssistantHandlers = [
  http.post('/api/aiAssistant/chat', async ({ request }) => {
    const body = (await request.json()) as { message: string };
    const userMessage = body.message.toLowerCase();

    // 模拟网络延迟
    await delay(500);

    // 匹配场景
    let responseData = mockData.defaultResponse;
    for (const scenario of mockData.scenarios) {
      if (scenario.keywords.some(keyword => userMessage.includes(keyword))) {
        responseData = scenario.response;
        break;
      }
    }

    // 为每个阶段生成ID和时间戳
    const stages = responseData.stages.map((stage, index) => ({
      id: `stage-${Date.now()}-${index}`,
      type: stage.type,
      title: stage.title,
      content: stage.content,
      status: 'done' as const,
      timestamp: Date.now() + index * 1000,
    }));

    return HttpResponse.json({
      code: 0,
      data: {
        messageId: `msg-${Date.now()}`,
        content: stages[stages.length - 1].content,
        stages,
      },
      message: 'success',
    });
  }),
];

