import { Table, Button, Space, Card, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const Information = () => {
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <Tag color={category === "新闻" ? "blue" : "green"}>{category}</Tag>
      ),
    },
    {
      title: "发布时间",
      dataIndex: "publishTime",
      key: "publishTime",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "已发布" ? "success" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>查看</a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "关于新功能上线的公告",
      category: "新闻",
      publishTime: "2024-04-15 10:00:00",
      status: "已发布",
    },
    {
      key: "2",
      title: "使用指南更新说明",
      category: "公告",
      publishTime: "2024-04-15 09:30:00",
      status: "草稿",
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            发布资讯
          </Button>
        </div>

        <Card>
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    </PageContainer>
  );
};

export default Information;
