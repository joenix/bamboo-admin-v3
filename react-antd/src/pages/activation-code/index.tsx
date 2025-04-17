import { Table, Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";

const columns = [
  {
    title: "激活码",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "图书ID",
    dataIndex: "bookId",
    key: "bookId",
  },
  {
    title: "状态",
    dataIndex: "active",
    key: "active",
    render: (active: string) => (
      <Tag color={active ? "green" : "red"}>{active ? "已激活" : "未激活"}</Tag>
    ),
  },
  {
    title: "用户ID",
    dataIndex: "userId",
    key: "userId",
    render: (userId: string) => (userId ? userId : "-"),
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) =>
      dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
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

export default function ActivationCode() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filters = [];
    api
      .post(apiConfig.Code.getall + "?page=" + page + "&pageSize=" + pageSize, {
        filters,
      })
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
            生成激活码
          </Button>
        </div>
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
      </div>
    </PageContainer>
  );
}
