import { useState, useEffect } from "react";
import { Table, Button, Space, Card, message, Form, Input, Modal } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import InformationDrawer from "./components/InformationDrawer";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";

interface InformationItem {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Information = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerType, setDrawerType] = useState<"create" | "edit">("create");
  const [currentItem, setCurrentItem] = useState<InformationItem | null>(null);
  const [data, setData] = useState<InformationItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
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
      render: (record: InformationItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setDrawerType("edit");
              setCurrentItem(record);
              setDrawerVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这条资讯吗？",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .post(apiConfig.Information.delete, {
        id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          message.success("删除成功");
          setData(data.filter((item) => item.id !== id));
        }
        setLoading(false);
      });
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

    const filters = [
      {
        key: "type",
        value: "0",
      },
    ];

    const searchValues = searchForm.getFieldsValue();
    if (searchValues.name) {
      filters.push({
        key: "name",
        value: searchValues.name,
      });
    }

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
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <Card>
          <Form
            form={searchForm}
            layout="inline"
            onFinish={handleSearch}
            className="mb-4"
          >
            <Form.Item name="name" label="标题">
              <Input placeholder="请输入标题" allowClear />
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

          <div className="flex justify-end mb-4">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setDrawerType("create");
                setCurrentItem(null);
                setDrawerVisible(true);
              }}
            >
              发布资讯
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
        </Card>
      </div>

      <InformationDrawer
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setCurrentItem(null);
        }}
        onSuccess={() => {
          fetchData();
        }}
        informationItem={currentItem}
        type={drawerType}
      />
    </PageContainer>
  );
};

export default Information;
