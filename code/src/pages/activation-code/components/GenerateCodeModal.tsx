import React, { useState } from 'react';
import { Modal, Form, Select, message } from 'antd';
import api from '@/api';
import { apiConfig } from '@/api/config';
import dayjs from 'dayjs';

interface Book {
  id: number;
  name: string;
}

interface GenerateCodeModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  bookData: Book[];
}

const GenerateCodeModal: React.FC<GenerateCodeModalProps> = ({ visible, onCancel, onSuccess, bookData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const response = await api.post(apiConfig.Code.create, {
        bookId: values.bookId,
        code: dayjs().valueOf().toString(),
      });

      if (response.data.status === 200) {
        message.success('激活码生成成功');
        onSuccess();
        form.resetFields();
      } else {
        message.error(response.data.msg || '生成失败');
      }
    } catch {
      message.error('生成失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="生成激活码" open={visible} onCancel={onCancel} onOk={handleSubmit} okText="生成" cancelText="取消" confirmLoading={loading} destroyOnClose>
      <Form form={form} layout="vertical" initialValues={{ count: 1 }}>
        <Form.Item name="bookId" label="选择书籍" rules={[{ required: true, message: '请选择书籍' }]}>
          <Select
            placeholder="请选择书籍"
            options={bookData.map(book => ({
              label: book.name,
              value: book.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GenerateCodeModal;
