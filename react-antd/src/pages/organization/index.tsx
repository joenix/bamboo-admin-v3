import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const columns = [
  {
    title: "机构名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "地址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "正常" ? "green" : "red"}>{status}</Tag>
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
    name: "北京大学",
    type: "高校",
    address: "北京市海淀区",
    status: "正常",
  },
  {
    key: "2",
    name: "清华大学",
    type: "高校",
    address: "北京市海淀区",
    status: "正常",
  },
];

export default function Organization() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            添加机构
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
}
