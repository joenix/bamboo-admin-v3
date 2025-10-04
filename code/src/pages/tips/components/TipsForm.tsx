import { Form, Input, Button } from 'antd';
/**
 *  1 图片
 *  2 视频
 *  3 书
 *  4 音乐
 *  5 附件
 */

const { TextArea } = Input;

const TipsForm = ({ initialValues, onSubmit, onClose, type, form }: { initialValues: any; onSubmit: any; onClose: any; type: any; form: any }) => {
  return (
    <Form form={form} disabled={type === 'detail'} initialValues={initialValues} onFinish={onSubmit} layout="vertical">
      <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入内容' }]}>
        <TextArea rows={8} />
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

export default TipsForm;
