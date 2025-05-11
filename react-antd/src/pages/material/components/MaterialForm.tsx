import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '@/api';
import { apiConfig } from '@/api/config';
/**
 *  1 图片
 *  2 视频
 *  3 书
 *  4 音乐
 *  5 附件
 */
interface MaterialFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  onClose: () => void;
  type: 'add' | 'edit' | 'detail';
  form: any;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ initialValues, onSubmit, onClose, type, form }) => {
  const [fileType, setFileType] = useState<number>(initialValues?.mineType || 1);
  const [previewUrl, setPreviewUrl] = useState<string>(initialValues?.url || '');

  const handleTypeChange = (value: number) => {
    setFileType(value);
    setPreviewUrl('');
    form.setFieldsValue({ url: '' });
  };

  const renderPreview = () => {
    if (!previewUrl) return null;

    switch (fileType) {
      case 1: // 图片
        return <Image src={previewUrl} style={{ maxWidth: 200, marginTop: 8 }} />;
      case 2: // 视频
        return <video src={previewUrl} controls style={{ maxWidth: 200, marginTop: 8 }} />;
      case 4: // 音乐
        return <audio src={previewUrl} controls style={{ marginTop: 8 }} />;
      default:
        return null;
    }
  };

  return (
    <Form disabled={type === 'detail'} initialValues={initialValues} onFinish={onSubmit} layout="vertical">
      <Form.Item label="类型" name="mineType" rules={[{ required: true, message: '请选择类型' }]}>
        <Select
          placeholder="请选择类型"
          options={[
            { value: 1, label: '图片' },
            { value: 2, label: '视频' },
            { value: 4, label: '音乐' },
          ]}
          onChange={handleTypeChange}
        />
      </Form.Item>
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item label="备注" name="content">
        <Input placeholder="请输入备注" />
      </Form.Item>
      <Form.Item label="跳转地址" name="link">
        <Input placeholder="请输入跳转地址" />
      </Form.Item>
      <Form.Item
        label="上传物料"
        name="url"
        rules={[{ required: true, message: '请上传物料' }]}
        getValueFromEvent={e => {
          if (Array.isArray(e?.fileList) && e.fileList[0]?.status === 'done') {
            return e.fileList[0].response.msg[0].path;
          }
          return '';
        }}
      >
        <Upload
          action={`${apiConfig.File.upload}`}
          name="files"
          maxCount={1}
          headers={{
            Token: JSON.parse(localStorage.getItem('user') || '{}').token,
          }}
          onChange={info => {
            if (info.file.status === 'done') {
              const fileUrl = info.file.response.msg[0].path;
              form.setFieldsValue({ url: fileUrl });
              setPreviewUrl(fileUrl);
              message.success('上传成功');
            } else if (info.file.status === 'error') {
              message.error('上传失败');
            }
          }}
        >
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
        {renderPreview()}
      </Form.Item>
      {type !== 'detail' && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={onClose} style={{ marginLeft: '8px' }}>
            取消
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default MaterialForm;
