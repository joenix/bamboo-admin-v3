import { Drawer, Form, Input, Button, message } from "antd";
import { useState } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";

interface UserEditDrawerProps {
  visible: boolean;
  onClose: () => void;
  userData: {
    id: number;
    nickname: string;
    mobile: string;
    avatarUrl: string;
  };
  onSuccess: () => void;
}

const UserEditDrawer: React.FC<UserEditDrawerProps> = ({
  visible,
  onClose,
  userData,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await api.post(apiConfig.User.update, {
        id: userData.id,
        ...values,
      });

      if (response.data.status === 200) {
        message.success("更新成功");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("更新失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="编辑用户信息"
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" initialValues={userData}>
        <Form.Item
          name="nickname"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="手机号"
          rules={[
            { required: true, message: "请输入手机号" },
            { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="avatarUrl"
          label="头像URL"
          rules={[{ required: true, message: "请输入头像URL" }]}
        >
          <Input placeholder="请输入头像URL" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserEditDrawer;
