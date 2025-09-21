import { Table, Button, Space, message, Drawer, Form, Input, Modal, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import { useState, useEffect } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';
import TeacherForm from './components/TeacherForm';
import { Teacher } from './types';

const TypeList = [
  { id: '1', name: '点读师' },
  { id: '2', name: '导学师' },
  { id: '3', name: '规划师' },
];

const GenderList = [
  { id: '1', name: '男' },
  { id: '0', name: '女' },
];

export default function Teach() {
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentRecord, setCurrentRecord] = useState<Teacher | null>(null);
  const [data, setData] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这位教师吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .post(apiConfig.Teach.delete, {
        id,
      })
      .then(res => {
        if (res.data.status === 200) {
          message.success('删除成功');
          setData(data.filter(item => item.id !== id));
        }
        setLoading(false);
      });
  };

  const handleEdit = (record: Teacher) => {
    setFormMode('edit');
    setCurrentRecord(record);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setFormMode('add');
    setCurrentRecord(null);
    setFormVisible(true);
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
    if (searchValues.name) {
      filters.push({
        key: 'name',
        value: searchValues.name,
      });
    }

    api
      .post(apiConfig.Teach.getall + '?page=' + page + '&pageSize=' + pageSize, {
        filters,
      })
      .then(res => {
        if (res.data.status === 200) {
          const data = res.data.msg.data.map((item: Teacher) => {
            const content = item.content.split(',');
            return {
              ...item,
              gender: content[0],
              age: content[1],
              address: content[2],
            };
          });
          setData(data);
          setTotal(res.data.msg.counts);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => GenderList.find(item => item.id === gender)?.name,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '个人介绍',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
    },
    {
      title: '头像',
      dataIndex: 'img',
      key: 'img',
      render: (img: string) => <img src={img} alt="头像" className="w-10 h-10 rounded-full" />,
    },
    // Type to Mode
    {
      title: '师资类型',
      dataIndex: 'mode',
      key: 'mode',
      render: (mode: string) => TypeList.find(item => item.id === mode)?.name,
    },
    {
      title: '操作',
      key: 'action',
      render: (record: Teacher) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => showDeleteConfirm(record.id)}>
            删除
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
            <Form.Item name="name" label="姓名">
              <Input placeholder="请输入姓名" allowClear />
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

          <div className="flex justify-end mb-4">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加教师
            </Button>
          </div>

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

        {formVisible && (
          <Drawer title={formMode === 'add' ? '添加教师' : '编辑教师'} placement="right" width={500} onClose={() => setFormVisible(false)} open={formVisible}>
            <TeacherForm
              visible={formVisible}
              onClose={() => setFormVisible(false)}
              initialValues={currentRecord || undefined}
              mode={formMode}
              onSuccess={() => {
                setFormVisible(false);
                fetchData();
              }}
            />
          </Drawer>
        )}
      </div>
    </PageContainer>
  );
}
