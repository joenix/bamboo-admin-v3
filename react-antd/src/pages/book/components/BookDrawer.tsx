import { Drawer, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';

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
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (type !== 'add' && record) {
      form.setFieldsValue(record);
      setImageUrl(record.img);
    } else {
      form.resetFields();
      setImageUrl('');
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
      <Form form={form} layout="vertical" disabled={type === 'view'} initialValues={record}>
        <Form.Item name="name" label="书名" rules={[{ required: true, message: '请输入书名' }]}>
          <Input placeholder="请输入书名" />
        </Form.Item>

        <Form.Item name="img" label="封面" rules={[{ required: true, message: '请上传封面' }]}>
          <div>
            {imageUrl && (
              <div style={{ marginBottom: 8 }}>
                <img src={imageUrl} alt="封面预览" style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} />
              </div>
            )}
            <Upload
              name="files"
              action={apiConfig.File.upload}
              headers={{
                Token: JSON.parse(localStorage.getItem('user') || '{}').token,
              }}
              showUploadList={false}
              onChange={info => {
                if (info.file.status === 'done') {
                  const path = info.file.response.msg[0].path;
                  form.setFieldValue('img', path);
                  setImageUrl(path);
                  message.success('上传成功');
                } else if (info.file.status === 'error') {
                  message.error('上传失败');
                }
              }}
            >
              <Button icon={<UploadOutlined />}>上传封面</Button>
            </Upload>
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
