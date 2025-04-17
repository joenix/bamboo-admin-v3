import { Table, Button, Space, Tag, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";
import GenerateCodeModal from "./components/GenerateCodeModal";

export default function ActivationCode() {
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
      title: "图书名称",
      dataIndex: "bookId",
      key: "bookId",
      render: (bookId: number) => {
        const book: any = bookData.find(
          (item: { id: number }) => item.id === bookId
        );
        return book ? book.name : "-";
      },
    },
    {
      title: "状态",
      dataIndex: "active",
      key: "active",
      render: (active: string) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "已激活" : "未激活"}
        </Tag>
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
      render: (record: { id: number }) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </a>
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
  const [bookData, setBookData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .post(apiConfig.Code.delete, {
        id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          message.success("删除成功");
          setData(data.filter((item: { id: number }) => item.id !== id));
        }
        setLoading(false);
      });
  };

  const getBookData = async () => {
    const res = await api.post(apiConfig.Book.getall + "?page=1&pageSize=999");
    if (res.data.status === 200) {
      setBookData(res.data.msg.data);
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

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
  const handleAdd = () => {
    setModalVisible(true);
  };
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
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
      <GenerateCodeModal
        visible={modalVisible}
        bookData={bookData}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          setRefresh(true);
        }}
      />
    </PageContainer>
  );
}
