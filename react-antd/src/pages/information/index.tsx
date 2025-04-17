import { useState, useEffect } from "react";
import { Table, Button, Space, Card, Tag, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";

const Information = () => {
  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "分类",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "0" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "发布时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => (
        <span>{dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>
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

  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const filters = [
      {
        key: "type",
        value: "0",
      },
    ];
    api
      .post(
        apiConfig.Information.getall +
          "?page=" +
          page +
          "&pageSize=" +
          pageSize,
        {
          filters,
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.msg.data);
          setTotal(res.data.msg.counts);
        }
        setLoading(false);
        setRefresh(false);
      });
  }, [page, pageSize, refresh]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            发布资讯
          </Button>
        </div>

        <Card>
          <Table
            rowKey={"id"}
            columns={columns}
            dataSource={data}
            scroll={{ y: "calc(100vh - 380px)" }}
            className="[&_.ant-table-body]:!h-[calc(100vh-380px)]"
            loading={loading}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 20, 50],
              showTotal: (total, range) =>
                `第 ${range[0]}-${range[1]} 共 ${total} 条`,
              locale: {
                items_per_page: "条/页",
                jump_to: "跳至",
                jump_to_confirm: "确定",
                page: "页",
                prev_page: "上一页",
                next_page: "下一页",
                prev_5: "向前 5 页",
                next_5: "向后 5 页",
                prev_3: "向前 3 页",
                next_3: "向后 3 页",
              },
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              hideOnSinglePage: false,
            }}
          />
        </Card>
      </div>
    </PageContainer>
  );
};

export default Information;
