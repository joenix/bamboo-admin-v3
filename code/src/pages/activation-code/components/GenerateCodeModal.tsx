import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, message, InputNumber } from 'antd';
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
  console.log(20, bookData);

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchBooks = () => {
    console.log(41000);
    const filters: { key: string; value: string }[] = [];

    api
      .post(apiConfig.Book.getall + '?page=' + page + '&pageSize=' + pageSize, {
        filters,
      })
      .then(res => {
        if (res.data.status === 200) {
          setBooks(res.data.msg.data);
        }
      });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const response = await api.post(apiConfig.Code.create, {
        bookId: values.bookId,
        count,
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

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <Modal title="生成激活码" open={visible} onCancel={onCancel} onOk={handleSubmit} okText="生成" cancelText="取消" confirmLoading={loading} destroyOnClose>
      <Form form={form} layout="vertical" initialValues={{ count: 1 }}>
        <Form.Item name="count" label="数量" rules={[{ required: true, message: '请填写数量' }]}>
          <InputNumber min={0} max={10000} value={count} onChange={value => setCount((value ?? 0) as number)} />
        </Form.Item>
        <Form.Item name="bookId" label="书籍" rules={[{ required: true, message: '请选择书籍' }]}>
          <Select
            placeholder="请选择书籍"
            options={books.map(book => ({
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
