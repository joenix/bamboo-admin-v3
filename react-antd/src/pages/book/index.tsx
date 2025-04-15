import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const columns = [
  {
    title: "书名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "出版社",
    dataIndex: "publisher",
    key: "publisher",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "在售" ? "green" : "red"}>{status}</Tag>
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
    name: "示例书籍1",
    author: "张三",
    publisher: "人民出版社",
    status: "在售",
  },
  {
    key: "2",
    name: "示例书籍2",
    author: "李四",
    publisher: "教育出版社",
    status: "下架",
  },
];

export default function Book() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            添加书籍
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
}
