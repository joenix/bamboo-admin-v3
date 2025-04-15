import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const columns = [
  {
    title: "激活码",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "未使用" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "有效期",
    dataIndex: "expiryDate",
    key: "expiryDate",
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    code: "ABC123",
    type: "月度会员",
    status: "未使用",
    expiryDate: "2024-04-20",
  },
  {
    key: "2",
    code: "DEF456",
    type: "年度会员",
    status: "已使用",
    expiryDate: "2024-04-21",
  },
];

export default function ActivationCode() {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <Button type="primary" icon={<PlusOutlined />}>
          生成激活码
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </PageContainer>
  );
}
