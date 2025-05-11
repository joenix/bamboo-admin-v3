import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Form,
  Input,
  Card,
  Modal,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";
import GenerateCodeModal from "./components/GenerateCodeModal";

interface Book {
  id: number;
  name: string;
}

interface ActivationCode {
  id: number;
  code: string;
  bookId: number;
  active: boolean;
  userId?: string;
  createdAt: string;
}

interface SearchFormValues {
  code?: string;
  bookId?: number;
  active?: boolean;
}

export default function ActivationCode() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<ActivationCode[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState<Book[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchForm] = Form.useForm<SearchFormValues>();

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
        const book = bookData.find((item) => item.id === bookId);
        return book ? book.name : "-";
      },
    },
    {
      title: "状态",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
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
      render: (record: ActivationCode) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个激活码吗？此操作不可恢复。",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        setLoading(true);
        api
          .post(apiConfig.Code.delete, {
            id,
          })
          .then((res) => {
            if (res.data.status === 200) {
              message.success("删除成功");
              setData(data.filter((item) => item.id !== id));
            }
            setLoading(false);
          });
      },
    });
  };

  const getBookData = async () => {
    const res = await api.post(apiConfig.Book.getall + "?page=1&pageSize=999");
    if (res.data.status === 200) {
      setBookData(res.data.msg.data);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handleReset = () => {
    searchForm.resetFields();
    setPage(1);
    fetchData();
  };

  const fetchData = () => {
    setLoading(true);
    const filters: { key: string; value: string }[] = [];
    const searchValues = searchForm.getFieldsValue();

    if (searchValues.code) {
      filters.push({
        key: "code",
        value: searchValues.code,
      });
    }
    if (searchValues.bookId) {
      filters.push({
        key: "bookId",
        value: searchValues.bookId.toString(),
      });
    }
    if (searchValues.active !== undefined) {
      filters.push({
        key: "active",
        value: searchValues.active.toString(),
      });
    }

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
  };

  useEffect(() => {
    getBookData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, refresh]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Form form={searchForm} layout="inline" onFinish={handleSearch}>
              <Form.Item name="code" label="激活码">
                <Input placeholder="请输入激活码" allowClear />
              </Form.Item>
              <Form.Item name="bookId" label="图书">
                <Input placeholder="请输入图书ID" allowClear />
              </Form.Item>
              <Form.Item name="active" label="状态">
                <Input placeholder="请输入状态" allowClear />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    搜索
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              生成激活码
            </Button>
          </div>
        </Card>

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
