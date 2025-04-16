import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import MaterialForm from "./MaterialForm";
import api from "@/api";
import { apiConfig } from "@/api/config";

const MaterialDrawer = ({ onClose, materialId, onSuccess, materialType }) => {
  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (materialId) {
      // 编辑模式，获取物料信息
      api
        .post(apiConfig.Material.getDetail, {
          id: materialId,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setInitialValues(res.data.msg);
            setOpen(true);
          }
        });
    } else {
      // 新增模式，清空表单
      setInitialValues({});
      setOpen(true);
    }
  }, [materialId]);

  const handleSubmit = (values) => {
    const apiCall = materialId
      ? api.put(`${apiConfig.Material.update}/${materialId}`, values)
      : api.post(apiConfig.Material.create, values);

    apiCall.then((res) => {
      if (res.data.status === 200) {
        onSuccess();
        onClose();
      }
    });
  };

  return (
    <Drawer
      title={
        materialId
          ? materialType === "edit"
            ? "编辑物料"
            : "查看物料"
          : "新增物料"
      }
      open={open}
      onClose={onClose}
      width={480}
    >
      <MaterialForm
        type={materialType}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </Drawer>
  );
};

export default MaterialDrawer;
