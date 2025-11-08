import { Card, Empty, List, Badge, Tag } from 'antd';
import { BellOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';

const Messages = () => {
  const messageData = [
    {
      id: 1,
      type: 'info',
      title: '系统通知示例',
      description: '这是一条系统通知消息的示例',
      time: '2分钟前',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: '风险预警示例',
      description: '这是一条风险预警消息的示例',
      time: '1小时前',
      read: false,
    },
  ];

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">消息中心</h1>
          <p className="tw-mt-1 tw-text-sm tw-text-gray-500">查看系统通知和预警消息</p>
        </div>
        <Badge count={5}>
          <BellOutlined className="tw-text-2xl tw-text-gray-600" />
        </Badge>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        <Card className="tw-border tw-border-gray-200">
          <div className="tw-text-center">
            <p className="tw-text-3xl tw-font-bold tw-text-blue-600">0</p>
            <p className="tw-mt-2 tw-text-sm tw-text-gray-600">系统通知</p>
          </div>
        </Card>
        <Card className="tw-border tw-border-gray-200">
          <div className="tw-text-center">
            <p className="tw-text-3xl tw-font-bold tw-text-orange-600">0</p>
            <p className="tw-mt-2 tw-text-sm tw-text-gray-600">风险预警</p>
          </div>
        </Card>
        <Card className="tw-border tw-border-gray-200">
          <div className="tw-text-center">
            <p className="tw-text-3xl tw-font-bold tw-text-gray-600">0</p>
            <p className="tw-mt-2 tw-text-sm tw-text-gray-600">未读消息</p>
          </div>
        </Card>
      </div>

      <Card className="tw-border tw-border-gray-200" title="消息列表">
        <List
          dataSource={messageData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div
                    className={`tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center ${
                      item.type === 'info' ? 'tw-bg-blue-50' : 'tw-bg-orange-50'
                    }`}
                  >
                    {item.type === 'info' ? (
                      <InfoCircleOutlined
                        className={`tw-text-lg ${
                          item.type === 'info' ? 'tw-text-blue-500' : 'tw-text-orange-500'
                        }`}
                      />
                    ) : (
                      <WarningOutlined
                        className={`tw-text-lg ${
                          item.type === 'info' ? 'tw-text-blue-500' : 'tw-text-orange-500'
                        }`}
                      />
                    )}
                  </div>
                }
                title={
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span>{item.title}</span>
                    {!item.read && <Tag color="red">未读</Tag>}
                  </div>
                }
                description={item.description}
              />
              <div className="tw-text-sm tw-text-gray-500">{item.time}</div>
            </List.Item>
          )}
        />
        <Empty
          className="tw-mt-8"
          description={<span className="tw-text-gray-500">暂无更多消息</span>}
        />
      </Card>
    </div>
  );
};

export default Messages;
