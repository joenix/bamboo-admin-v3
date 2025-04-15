import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const columns = [
  {
    title: "礼品名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "库存",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "上架" ? "green" : "red"}>{status}</Tag>
    ),
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
    name: "示例礼品1",
    type: "实物",
    stock: 100,
    status: "上架",
  },
  {
    key: "2",
    name: "示例礼品2",
    type: "虚拟",
    stock: 0,
    status: "下架",
  },
];

export default function Gift() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            添加礼品
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
}
