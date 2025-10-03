import { Table, Button, Space, Form, Input, Card, Modal, InputNumber, Col, Row, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import { useState, useEffect } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';
import dayjs from 'dayjs';
import UserEditDrawer from '@/pages/user/components/UserEditDrawer';
import type { ColumnsType } from 'antd/es/table';

interface Credit {
  id: number;
  userId: number;
  credit: number;
}

interface UserData {
  id: number;
  nickname: string;
  mobile: string;
  avatarUrl: string;
  createdAt: string;
  credits?: Credit | null;
}

export default function User() {
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [data, setData] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();

  // 开启积分操控面板
  const [isCreditOpen, setIsCreditOpen] = useState(false);

  // 积分操作用户信息（直接保存整个 UserData）
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  // 积分操作积分数值
  const [credit, setCredit] = useState<number>(0);

  // 设置积分差值
  const [minus, setMinus] = useState<number>(0);

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
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  // 重置 minus 每次打开弹窗时归零
  useEffect(() => {
    if (isCreditOpen) {
      setMinus(0);
    }
  }, [isCreditOpen]);

  // 点击“积分”按钮，打开弹窗（record 为 UserData）
  const creditEdit = (record: UserData) => {
    if (!record) return;
    // 如果没有 credits 则提示并返回
    if (!record.credits) {
      message.error('该用户暂无积分记录');
      return;
    }

    setUserInfo(record);
    setCredit(record.credits.credit ?? 0);
    setIsCreditOpen(true);
  };

  const handleEdit = (record: UserData) => {
    setCurrentUser(record);
    setEditDrawerVisible(true);
  };

  const handleEditSuccess = () => {
    fetchData();
  };

  const handleCredit = async () => {
    if (!userInfo) return;

    const userId = userInfo.id;
    const newCredit = credit + minus;

    // 积分不能为负
    if (newCredit < 0) {
      return message.error('该用户积分不足');
    }

    // 本地立即更新展示
    setCredit(newCredit);

    // 更新后端（传用户 id 和新的积分值）
    api
      .post(apiConfig.Cretid.update, {
        userId,
        // 正负值
        credit: minus,
        content: '后台手动修改',
        operation: '后台手动修改',
      })
      .then(res => {
        if (res.data.status === 200) {
          message.success('积分更新成功，请刷新页面');
          // 可选：刷新表格数据
          fetchData();
        } else {
          message.error(res.data?.msg || '更新失败');
        }
      })
      .catch(err => {
        console.error(err);
        message.error('更新失败');
      });
  };

  const columns: ColumnsType<UserData> = [
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
      title: '积分',
      dataIndex: 'credits',
      key: 'credits',
      render: (_: unknown, record: UserData) => (
        <Space size="middle">
          <Button type="link" onClick={() => creditEdit(record)} disabled={!record.credits}>
            积分：{record.credits?.credit ?? 0}
          </Button>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: UserData) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              handleEdit(record);
            }}
          >
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
              onChange: (p, ps) => {
                setPage(p);
                setPageSize(ps);
              },
              hideOnSinglePage: false,
            }}
          />
        </Card>

        <Modal title="积分操作" footer={null} closable={true} open={isCreditOpen} onCancel={() => setIsCreditOpen(false)}>
          <div className="space-y-6">
            <Row>
              <Col span={12}>
                <Space direction="vertical">
                  <div>昵称：{userInfo?.nickname ?? '-'}</div>
                  <div>手机：{userInfo?.mobile ?? '-'}</div>
                  <div>积分：{credit}</div>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <div>请输入需要 添加 或 扣除 的积分：</div>
                  <Space>
                    <InputNumber min={-10000} max={10000} value={minus} onChange={value => setMinus((value ?? 0) as number)} />
                    <Button type="primary" onClick={handleCredit}>
                      确认更新
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>
          </div>
        </Modal>

        {editDrawerVisible && currentUser && <UserEditDrawer visible={editDrawerVisible} onClose={() => setEditDrawerVisible(false)} userData={currentUser} onSuccess={handleEditSuccess} />}
      </div>
    </PageContainer>
  );
}
