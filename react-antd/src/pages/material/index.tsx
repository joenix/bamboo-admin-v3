import { Table, Button, Space, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const Material = () => {
  const columns = [
    {
      title: "素材名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "上传时间",
      dataIndex: "uploadTime",
      key: "uploadTime",
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
      name: "示例图片1.jpg",
      type: "图片",
      size: "2.3MB",
      uploadTime: "2024-04-15 10:00:00",
    },
    {
      key: "2",
      name: "示例文档1.pdf",
      type: "文档",
      size: "1.5MB",
      uploadTime: "2024-04-15 09:30:00",
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            上传素材
          </Button>
        </div>

        <Card>
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    </PageContainer>
  );
};

export default Material;
