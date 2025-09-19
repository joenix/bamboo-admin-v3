import { Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';
import { Teacher, TeacherFormData } from '../types';

interface TeacherFormProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: Teacher;
  mode: 'add' | 'edit';
  onSuccess: () => void;
}
const TypeList = [
  { id: '1', name: '点读师' },
  { id: '2', name: '导学师' },
  { id: '3', name: '规划师' },
];

// const GenderList = [
//   { id: "1", name: "男" },
//   { id: "0", name: "女" },
// ];

const TeacherForm: React.FC<TeacherFormProps> = ({
  // visible,
  onClose,
  initialValues,
  mode,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (values: TeacherFormData) => {
    setLoading(true);
    try {
      const content = [values.gender, values.age, values.address, TypeList.find(item => item.id === values.type)?.name].join(',');

      const submitData = {
        name: values.name,
        img: values.img,
        video: null,
        type: values.type,
        remark: values.remark,
        content,
      };
      let isSuccess = false;
      if (mode === 'add') {
        const res = await api.post(apiConfig.Teach.create, submitData);
        if (res.data.status === 200) {
          message.success('添加成功');
          isSuccess = true;
        } else {
          message.error(res.data.msg);
        }
      } else {
        const res = await api.post(apiConfig.Teach.update, {
          ...submitData,
          id: initialValues?.id,
        });
        if (res.data.status === 200) {
          message.success('更新成功');
          isSuccess = true;
        } else {
          message.error(res.data.msg);
        }
      }
      if (isSuccess) {
        onSuccess();
      }
    } catch (error) {
      message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄' }]}>
        <Input type="number" />
      </Form.Item>

      <Form.Item name="gender" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
        <Select>
          <Select.Option value="1">男</Select.Option>
          <Select.Option value="0">女</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="address" label="地址" rules={[{ required: true, message: '请输入地址' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="type" label="师资类型" rules={[{ required: true, message: '请选择师资类型' }]}>
        <Select>
          <Select.Option value="1">点读师</Select.Option>
          <Select.Option value="2">导学师</Select.Option>
          <Select.Option value="3">规划师</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="remark" label="个人介绍">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="img" label="头像">
        <Upload
          action={apiConfig.File.upload}
          name="files"
          headers={{
            Token: JSON.parse(localStorage.getItem('user') || '{}').token,
          }}
          showUploadList={false}
          onChange={info => {
            if (info.file.status === 'uploading') {
              setUploading(true);
            }
            if (info.file.status === 'done') {
              setUploading(false);
              form.setFieldValue('img', info.file.response.msg[0].path);
            }
            if (info.file.status === 'error') {
              setUploading(false);
              message.error('上传失败');
            }
          }}
        >
          <Button icon={<UploadOutlined />}>上传头像</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} disabled={uploading}>
          提交
        </Button>
        <Button onClick={onClose} style={{ marginLeft: 8 }}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeacherForm;
