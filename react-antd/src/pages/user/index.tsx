import { Table, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
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
    username: "admin",
    email: "admin@example.com",
    role: "管理员",
    status: "正常",
  },
  {
    key: "2",
    username: "user",
    email: "user@example.com",
    role: "普通用户",
    status: "正常",
  },
];

export default function User() {
  return (
    <PageContainer>
      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />}>
          新增用户
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </PageContainer>
  );
}
