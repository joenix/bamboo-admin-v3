import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "职称",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "所属机构",
    dataIndex: "organization",
    key: "organization",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "在职" ? "green" : "red"}>{status}</Tag>
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
    name: "张老师",
    title: "教授",
    organization: "北京大学",
    status: "在职",
  },
  {
    key: "2",
    name: "李老师",
    title: "副教授",
    organization: "清华大学",
    status: "离职",
  },
];

export default function Teacher() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            添加教师
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
}
