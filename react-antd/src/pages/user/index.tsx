import { Table, Button, Space, Tag, message } from "antd";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";
import UserEditDrawer from "@/pages/user/components/UserEditDrawer";

export default function User() {
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const columns = [
    {
      title: "用户名",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "头像",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatarUrl: string) => (
        <img src={avatarUrl} alt="头像" className="w-10 h-10 rounded-full" />
      ),
    },
    {
      title: "注册时间",
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
          <a onClick={() => handleEdit(record)}>编辑</a>
          {/* <a
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </a> */}
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
      .post(apiConfig.User.delete, {
        id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          message.success("删除成功");
          setData(data.filter((item: { id: number }) => item.id !== id));
        } else {
          message.error(res.data.msg);
        }
        setLoading(false);
      });
  };

  const handleEdit = (record: any) => {
    setCurrentUser(record);
    setEditDrawerVisible(true);
  };

  const handleEditSuccess = () => {
    setRefresh(true);
  };

  useEffect(() => {
    setLoading(true);
    const filters = [];
    api
      .post(apiConfig.User.getall + "?page=" + page + "&pageSize=" + pageSize, {
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
        {/* <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            新增用户
          </Button>
        </div> */}
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
        {editDrawerVisible && (
          <UserEditDrawer
            visible={editDrawerVisible}
            onClose={() => setEditDrawerVisible(false)}
            userData={currentUser}
            onSuccess={handleEditSuccess}
          />
        )}
      </div>
    </PageContainer>
  );
}
