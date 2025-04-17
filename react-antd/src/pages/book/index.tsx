import { Table, Button, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";
import BookDrawer from "./components/BookDrawer";

interface BookRecord {
  id: number;
  name: string;
  img: string;
  url: string;
}

export default function Book() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerType, setDrawerType] = useState<"add" | "edit" | "view">("add");
  const [currentRecord, setCurrentRecord] = useState<BookRecord | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<BookRecord[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "书名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "封面",
      dataIndex: "img",
      key: "img",
      render: (img: string) => (
        <img src={img} alt="封面" className="w-10 h-10 rounded-full" />
      ),
    },
    {
      title: "链接",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "操作",
      key: "action",
      render: (record: BookRecord) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setDrawerType("add");
    setCurrentRecord(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: BookRecord) => {
    setDrawerType("edit");
    setCurrentRecord(record);
    setDrawerVisible(true);
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .post(apiConfig.Book.delete, {
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

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setCurrentRecord(null);
  };

  const handleDrawerSuccess = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    setLoading(true);
    const filters: any[] = [];
    api
      .post(apiConfig.Book.getall + "?page=" + page + "&pageSize=" + pageSize, {
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
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加书籍
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
        <BookDrawer
          visible={drawerVisible}
          onClose={handleDrawerClose}
          type={drawerType}
          record={currentRecord}
          onSuccess={handleDrawerSuccess}
        />
      </div>
    </PageContainer>
  );
}
