import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
const columns = [
  {
    title: "兑换单号",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "礼品名称",
    dataIndex: "giftName",
    key: "giftName",
  },
  {
    title: "兑换用户",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "已完成" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  {
    title: "兑换时间",
    dataIndex: "exchangeTime",
    key: "exchangeTime",
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>查看详情</a>
        <a>处理</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    orderNo: "EX20240320001",
    giftName: "示例礼品1",
    user: "张三",
    status: "已完成",
    exchangeTime: "2024-03-20",
  },
  {
    key: "2",
    orderNo: "EX20240321001",
    giftName: "示例礼品2",
    user: "李四",
    status: "待处理",
    exchangeTime: "2024-03-21",
  },
];

export default function GiftExchange() {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <Button type="primary" icon={<PlusOutlined />}>
          导出记录
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </PageContainer>
  );
}
