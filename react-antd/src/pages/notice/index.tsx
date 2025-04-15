import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
const columns = [
  {
    title: "公告ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "已发布" ? "green" : "orange"}>{status}</Tag>
    ),
  },
  {
    title: "发布时间",
    dataIndex: "publishTime",
    key: "publishTime",
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
    id: "NT20240320001",
    title: "系统维护通知",
    content: "系统将于今晚进行维护",
    status: "已发布",
    publishTime: "2024-03-20",
  },
  {
    key: "2",
    id: "NT20240321001",
    title: "新功能上线",
    content: "新功能即将上线",
    status: "待发布",
    publishTime: "2024-03-21",
  },
];

export default function Notice() {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">公告管理</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          发布公告
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </PageContainer>
  );
}
