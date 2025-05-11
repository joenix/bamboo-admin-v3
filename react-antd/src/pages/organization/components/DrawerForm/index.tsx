import { Drawer, Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState } from "react";
import { apiConfig } from "@/api/config";

interface DrawerFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  title: string;
}

const TypeList = [
  { value: "0", label: "授权机构" },
  { value: "1", label: "培训机构" },
  { value: "2", label: "学校" },
];

const DrawerForm: React.FC<DrawerFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  title,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("表单验证失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: "files",
    action: apiConfig.File.upload,
    headers: {
      Token: JSON.parse(localStorage.getItem("user") || "{}").token,
    },
    onChange(info) {
      if (info.file.status === "done") {
        form.setFieldValue("img", info.file.response.msg[0].path);
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={handleSubmit} type="primary" loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: "请输入机构类型" }]}
        >
          <Select placeholder="请输入机构类型" options={TypeList} />
        </Form.Item>
        <Form.Item
          name="name"
          label="机构名称"
          rules={[{ required: true, message: "请输入机构名称" }]}
        >
          <Input placeholder="请输入机构名称" />
        </Form.Item>
        <Form.Item name="address" label="地址">
          <Input placeholder="请输入机构地址" />
        </Form.Item>
        <Form.Item name="remark0" label="机构描述1">
          <Input placeholder="请输入机构描述1" />
        </Form.Item>
        <Form.Item name="remark1" label="机构描述2">
          <Input placeholder="请输入机构描述2" />
        </Form.Item>
        <Form.Item name="remark2" label="机构描述3">
          <Input placeholder="请输入机构描述3" />
        </Form.Item>
        <Form.Item name="remark3" label="机构描述4">
          <Input placeholder="请输入机构描述4" />
        </Form.Item>
        <Form.Item name="remark4" label="机构描述5">
          <Input placeholder="请输入机构描述5" />
        </Form.Item>
        <Form.Item name="img" label="机构图片">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
