import { useEffect, useState } from 'react';
import { Drawer, Form, message } from 'antd';
import MaterialForm from './MaterialForm';
import api from '@/api';
import { apiConfig } from '@/api/config';

const MaterialDrawer = ({ onClose, materialItem, onSuccess, materialType }: any) => {
  const [form] = Form.useForm();

  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (materialItem) {
      // 编辑模式，获取物料信息
      setInitialValues(materialItem);
      setOpen(true);
    } else {
      // 新增模式，清空表单
      setInitialValues({});
      setOpen(true);
    }
  }, [materialItem]);

  const handleSubmit = (values: any) => {
    const submitData = {
      url: values.url,
      link: values.link,
      name: values.name,
      content: values.content,
      type: values.type,
    };
    const apiCall = materialItem
      ? api.post(apiConfig.Material.update, {
          ...submitData,
          id: materialItem.id,
        })
      : api.post(apiConfig.Material.create, submitData);

    apiCall.then(res => {
      if (res.data.status === 200) {
        onSuccess();
        onClose();
      } else {
        message.error('操作失败');
      }
    });
  };

  return (
    <Drawer title={materialItem ? (materialType === 'edit' ? '编辑物料' : '查看物料') : '新增物料'} open={open} onClose={onClose} width={480}>
      <MaterialForm form={form} type={materialType} initialValues={initialValues} onSubmit={handleSubmit} onClose={onClose} />
    </Drawer>
  );
};

export default MaterialDrawer;
