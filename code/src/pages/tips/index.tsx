import { useEffect, useState } from 'react';
import { Table, Button, Space, Card, message, Form, Input, Select, Modal } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import api from '@/api';
import { apiConfig } from '@/api/config';
import dayjs from 'dayjs';
import TipsDrawer from './components/TipsDrawer';
// {
//   "id": 1,
//   "url": "https://oss.lhdd.club/banner_1.webp",
//   "link": "https://oss.lhdd.club/banner_1.webp",
//   "name": "article_1",
//   "content": null,
//   "type": 1,
//   "delete": false,
//   "createdAt": "2024-11-11T19:43:12.000Z",
//   "updatedAt": "2024-11-11T19:43:12.000Z"
// }

interface Tips {
  id: number;
  url: string;
  link: string;
  name: string;
  content: string;
  mineType: number;
  createdAt: string;
  updatedAt: string;
}

interface SearchFormValues {
  name?: string;
  mineType?: number;
  content?: string;
}

const Tips = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<Tips[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingTipsItem, setEditingTipsItem] = useState<Tips | null>(null);
  const [editingTipsType, setEditingTipsType] = useState('');
  const [searchForm] = Form.useForm<SearchFormValues>();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '贴士内容',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => {
        return text || '无';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        // 2024-11-11T19:43:12.000Z
        const date = new Date(text);
        // 使用 dayjs 处理时间，并转换为北京时间
        // return dayjs(date).add(-8, "hour").format("YYYY-MM-DD HH:mm:ss");
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
      },
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      render: (/*text: any, */ record: Tips) => (
        <Space size="middle">
          {/* <a onClick={() => handleEdit(record.id, "detail")}>查看</a> */}
          <a onClick={() => handleEdit(record, 'edit')}>编辑</a>
          <a
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </a>
        </Space>
      ),
      width: 120,
    },
  ];

  const handleAdd = () => {
    setEditingTipsItem(null);
    setEditingTipsType('add');
    setDrawerVisible(true);
  };

  const handleEdit = (item: Tips, type: string) => {
    setLoading(true);
    setEditingTipsItem(item);
    setEditingTipsType(type);
    setDrawerVisible(true);
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条贴士吗？此操作不可恢复。',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setLoading(true);
        api
          .post(apiConfig.Tips.delete, {
            id,
          })
          .then(res => {
            if (res.data.status === 200) {
              message.success('删除成功');
              setData(data.filter(item => item.id !== id));
            }
            setLoading(false);
          });
      },
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
    const filters: { key: string; value: string | number; op?: string }[] = [];
    const searchValues = searchForm.getFieldsValue();

    if (searchValues.name) {
      filters.push({
        key: 'name',
        value: searchValues.name,
      });
    }
    if (searchValues.mineType) {
      filters.push({
        key: 'mineType',
        value: Number(searchValues.mineType),
        op: 'equals',
      });
    }
    if (searchValues.content) {
      filters.push({
        key: 'content',
        value: searchValues.content,
      });
    }

    api
      .post(apiConfig.Tips.getall + '?page=' + page + '&pageSize=' + pageSize, {
        filters,
      })
      .then(res => {
        if (res.data.status === 200) {
          setData(res.data.msg.data);
          setTotal(res.data.msg.counts);
        }
        setLoading(false);
        setRefresh(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, refresh]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Form form={searchForm} layout="inline" onFinish={handleSearch}>
              <Form.Item name="name" label="名称">
                <Input placeholder="请输入名称" allowClear />
              </Form.Item>
              <Form.Item name="mineType" label="类型">
                <Select
                  placeholder="请选择类型"
                  allowClear
                  options={[
                    { label: '图片', value: 1 },
                    { label: '视频', value: 2 },
                    { label: '音频', value: 4 },
                  ]}
                />
              </Form.Item>
              <Form.Item name="content" label="备注">
                <Input placeholder="请输入备注" allowClear />
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
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增素材
            </Button>
          </div>
        </Card>

        <Card>
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
      </div>
      {drawerVisible ? (
        <TipsDrawer
          onClose={() => setDrawerVisible(false)}
          tipsItem={editingTipsItem}
          tipsType={editingTipsType}
          onSuccess={() => {
            setDrawerVisible(false);
            setEditingTipsItem(null);
            setEditingTipsType('');
            // if (page === 1) {
            setRefresh(true);
            // }
          }}
        />
      ) : null}
    </PageContainer>
  );
};

export default Tips;
