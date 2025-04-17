import { Table, Button, Space, Tag, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";

export default function Teacher() {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "个人介绍",
      dataIndex: "remark",
      key: "remark",
      ellipsis: true,
    },
    {
      title: "头像",
      dataIndex: "img",
      key: "img",
      render: (img: string) => (
        <img src={img} alt="头像" className="w-10 h-10 rounded-full" />
      ),
    },
    {
      title: "师资类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "操作",
      key: "action",
      render: (record: { id: number }) => (
        <Space size="middle">
          <a>编辑</a>
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

  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .post(apiConfig.Teach.delete, {
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

  useEffect(() => {
    setLoading(true);
    const filters = [];
    api
      .post(
        apiConfig.Teach.getall + "?page=" + page + "&pageSize=" + pageSize,
        {
          filters,
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          const data = res.data.msg.data.map((item: any) => {
            const content = item.content.split(",");

            return {
              ...item,
              gender: content[0] === "1" ? "女" : "男",
              age: content[1],
              address: content[2],
              type: content[3],
            };
          });
          setData(data);
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
            添加教师
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
