import { Form, Input, Button, Select, Upload, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiConfig } from '@/api/config';
/**
 *  1 图片
 *  2 视频
 *  3 书
 *  4 音乐
 *  5 附件
 */
const MaterialForm = ({ initialValues, onSubmit, onClose, type, form }: { initialValues: any; onSubmit: any; onClose: any; type: any; form: any }) => {
  return (
    <Form disabled={type === 'detail'} initialValues={initialValues} onFinish={onSubmit} layout="vertical">
      <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
        <Select>
          <Select.Option value={1}>图片</Select.Option>
          <Select.Option value={2}>视频</Select.Option>
          <Select.Option value={4}>音乐</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入内容' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="跳转地址" name="link">
        <Input />
      </Form.Item>
      {initialValues.url && (
        <Form.Item label="链接">
          <Input value={initialValues.url} disabled />
        </Form.Item>
      )}
      <Form.Item label="上传物料" name="url" rules={[{ required: true, message: '请上传物料' }]}>
        {initialValues.url && (
          <div className=" mb-2">
            <Image width={80} height={80} src={initialValues.url} alt="图片" />
          </div>
        )}
        <Upload
          action={`${apiConfig.File.upload}`}
          name="files"
          maxCount={1}
          headers={{
            Token: JSON.parse(localStorage.getItem('user') || '{}').token,
          }}
          onChange={info => {
            if (info.file.status === 'done') {
              form.setFieldValue('url', info.file.response.msg[0].path);
              message.success('上传成功');
            } else if (info.file.status === 'error') {
              message.error('上传失败');
            }
          }}
        >
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
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
