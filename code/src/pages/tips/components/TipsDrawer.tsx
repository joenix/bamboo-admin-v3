import { useEffect, useState } from 'react';
import { Drawer, Form, message } from 'antd';
import TipsForm from './TipsForm';
import api from '@/api';
import { apiConfig } from '@/api/config';

const TipsDrawer = ({ onClose, tipsItem, onSuccess, tipsType }: any) => {
  const [form] = Form.useForm();

  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (tipsItem) {
      // 编辑模式，获取物料信息
      setInitialValues(tipsItem);
      setOpen(true);
    } else {
      // 新增模式，清空表单
      setInitialValues({});
      setOpen(true);
    }
  }, [tipsItem]);

  const handleSubmit = (values: any) => {
    const submitData = {
      url: values.url,
      link: values.link,
      name: values.name,
      content: values.content,
      type: values.type,
    };
    const apiCall = tipsItem
      ? api.post(apiConfig.Tips.update, {
          ...submitData,
          id: tipsItem.id,
        })
      : api.post(apiConfig.Tips.create, submitData);

    apiCall.then(res => {
      if (res.data.status === 200) {
        message.success('操作成功');
        onSuccess();
        onClose();
      } else {
        message.error('操作失败');
      }
    });
  };

  return (
    <Drawer title={tipsItem ? (tipsType === 'edit' ? '编辑贴士' : '查看贴士') : '新增贴士'} open={open} onClose={onClose} width={480}>
      <TipsForm form={form} type={tipsType} initialValues={initialValues} onSubmit={handleSubmit} onClose={onClose} />
    </Drawer>
  );
};

export default TipsDrawer;
