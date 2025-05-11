import { Drawer, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';
import CoverSelect from '@/components/CoverSelect';

interface BookRecord {
  id: number;
  name: string;
  img: string;
  url: string;
}

interface BookDrawerProps {
  visible: boolean;
  onClose: () => void;
  type: 'add' | 'edit' | 'view';
  record?: BookRecord;
  onSuccess?: () => void;
}

const BookDrawer: React.FC<BookDrawerProps> = ({ visible, onClose, type, record, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showCoverSelect, setShowCoverSelect] = useState(false);
  useEffect(() => {
    if (type !== 'add' && record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [type, record, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (type === 'add') {
        await api.post(apiConfig.Book.create, values);
        message.success('添加成功');
      } else if (type === 'edit') {
        await api.post(apiConfig.Book.update, { ...values, id: record?.id });
        message.success('更新成功');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Drawer
      title={type === 'add' ? '新增书籍' : type === 'edit' ? '编辑书籍' : '查看详情'}
      width={500}
      onClose={onClose}
      open={visible}
      footer={
        type !== 'view' && (
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={handleSubmit} type="primary" loading={loading}>
              确定
            </Button>
          </div>
        )
      }
    >
      <Form form={form} layout="vertical" disabled={type === 'view'}>
        <Form.Item name="name" label="书名" rules={[{ required: true, message: '请输入书名' }]}>
          <Input placeholder="请输入书名" />
        </Form.Item>

        <Form.Item name="img" label="封面" required rules={[{ required: true, message: '请选择封面' }]}>
          <CoverSelect
            open={showCoverSelect}
            onClose={() => {
              setShowCoverSelect(false);
            }}
            onSelect={(val: string) => {
              setShowCoverSelect(false);
              form.setFieldValue('img', val);
            }}
          />
          <div className="flex flex-row items-center gap-2">
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const imgUrl = getFieldValue('img');
                return imgUrl ? (
                  <div className="">
                    <img src={imgUrl} alt="封面" className="w-[80px] h-[80px] rounded-lg" />
                  </div>
                ) : null;
              }}
            </Form.Item>
            <Button onClick={() => setShowCoverSelect(true)}>选择封面</Button>
          </div>
        </Form.Item>

        <Form.Item name="url" label="链接" rules={[{ required: true, message: '请输入链接' }]}>
          <Input placeholder="请输入链接" />
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: true, message: '请输入内容' }]}>
          <Input placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BookDrawer;
