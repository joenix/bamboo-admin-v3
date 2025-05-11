import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '@/api';
import { apiConfig } from '@/api/config';

interface InformationDrawerProps {
  filterType: number;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  informationItem?: any;
  type?: 'create' | 'edit';
}

const InformationDrawer: React.FC<InformationDrawerProps> = ({ filterType, visible, onClose, onSuccess, informationItem, type = 'create' }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  // Quill 编辑器配置
  const modules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ align: [] }], ['link', 'image'], ['clean']],
  };

  useEffect(() => {
    if (informationItem && type === 'edit') {
      // 编辑模式，获取咨询信息
      form.setFieldsValue({
        name: informationItem.name,
      });
      setEditorContent(informationItem.content);
    } else {
      // 新增模式，清空表单
      form.resetFields();
      setEditorContent('');
    }
  }, [informationItem, type, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const submitData = {
        ...values,
        content: editorContent,
        type: filterType,
      };

      const apiCall =
        type === 'edit'
          ? api.post(apiConfig.Information.update, {
              ...submitData,
              id: informationItem.id,
            })
          : api.post(apiConfig.Information.create, submitData);

      const res = await apiCall;
      if (res.data.status === 200) {
        message.success(`${type === 'edit' ? '编辑' : '新增'}成功`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('表单提交失败:', error);
      message.error(`${type === 'edit' ? '编辑' : '新增'}失败`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={type === 'edit' ? '编辑咨询' : '新增咨询'}
      open={visible}
      onClose={onClose}
      width={720}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={handleSubmit} type="primary" loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="咨询标题" rules={[{ required: true, message: '请输入咨询标题' }]}>
          <Input placeholder="请输入咨询标题" />
        </Form.Item>
        <Form.Item label="咨询内容" required rules={[{ required: true, message: '请输入咨询内容' }]}>
          <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} modules={modules} style={{ height: '100%', marginBottom: '50px' }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default InformationDrawer;
