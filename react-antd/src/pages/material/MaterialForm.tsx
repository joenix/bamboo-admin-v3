import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "@/api";
import { apiConfig } from "@/api/config";
/**
 *  1 图片
 *  2 视频
 *  3 书
 *  4 音乐
 *  5 附件
 */
const MaterialForm = ({ initialValues, onSubmit, onClose, type }) => {
  return (
    <Form
      disabled={type === "detail"}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: "请选择类型" }]}
      >
        <Select>
          <Select.Option value={1}>图片</Select.Option>
          <Select.Option value={2}>视频</Select.Option>
          <Select.Option value={4}>音乐</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: "请输入名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: "请输入内容" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="跳转地址" name="link">
        <Input />
      </Form.Item>
      <Form.Item label="链接" name="url">
        <Input />
      </Form.Item>
      <Form.Item
        label="上传物料"
        name="attachments"
        rules={[{ required: true, message: "请上传物料" }]}
      >
        <Upload
          action={`https://api.lhdd.club${apiConfig.Material.upload}`}
          headers={{
            Token: JSON.parse(localStorage.getItem("user") || "{}").token,
          }}
          onChange={(info) => {
            console.log(info);
          }}
        >
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </Form.Item>
      {type !== "detail" && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={onClose} style={{ marginLeft: "8px" }}>
            取消
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default MaterialForm;
