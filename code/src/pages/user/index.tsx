import { Table, Button, Space, Form, Input, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import { useState, useEffect } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';
import dayjs from 'dayjs';
import UserEditDrawer from '@/pages/user/components/UserEditDrawer';

interface UserData {
  id: number;
  nickname: string;
  mobile: string;
  avatarUrl: string;
  createdAt: string;
}

// interface UserEditDrawerProps {
//   visible: boolean;
//   onClose: () => void;
//   userData?: UserData;
//   onSuccess: () => void;
// }

export default function User() {
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [data, setData] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();

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
    if (searchValues.nickname) {
      filters.push({
        key: 'nickname',
        value: searchValues.nickname,
      });
    }
    if (searchValues.mobile) {
      filters.push({
        key: 'mobile',
        value: searchValues.mobile,
      });
    }

    api
      .post(apiConfig.User.getall + '?page=' + page + '&pageSize=' + pageSize, {
        filters,
      })
      .then(res => {
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

  const handleEdit = (record: UserData) => {
    setCurrentUser(record);
    setEditDrawerVisible(true);
  };

  const handleEditSuccess = () => {
    fetchData();
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (avatarUrl: string) => <img src={avatarUrl} alt="头像" className="w-10 h-10 rounded-full" />,
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: UserData) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        <Card>
          <Form form={searchForm} layout="inline" onFinish={handleSearch} className="mb-4">
            <Form.Item name="nickname" label="用户名">
              <Input placeholder="请输入用户名" allowClear />
            </Form.Item>
            <Form.Item name="mobile" label="手机号">
              <Input placeholder="请输入手机号" allowClear />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>

          <Table
            rowKey={'id'}
            columns={columns}
            dataSource={data}
            scroll={{ y: 'calc(100vh - 380px)' }}
            className="[&_.ant-table-body]:!h-[calc(100vh-380px)]"
            loading={loading}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 20, 50],
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 共 ${total} 条`,
              locale: {
                items_per_page: '条/页',
                jump_to: '跳至',
                jump_to_confirm: '确定',
                page: '页',
                prev_page: '上一页',
                next_page: '下一页',
                prev_5: '向前 5 页',
                next_5: '向后 5 页',
                prev_3: '向前 3 页',
                next_3: '向后 3 页',
              },
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              hideOnSinglePage: false,
            }}
          />
        </Card>

        {editDrawerVisible && currentUser && <UserEditDrawer visible={editDrawerVisible} onClose={() => setEditDrawerVisible(false)} userData={currentUser} onSuccess={handleEditSuccess} />}
      </div>
    </PageContainer>
  );
}
