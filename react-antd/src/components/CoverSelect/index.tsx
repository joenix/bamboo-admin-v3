import React, { useEffect, useState } from 'react';
import { Modal, message, Pagination } from 'antd';
import api from '@/api';
import { apiConfig } from '@/api/config';

interface CoverSelectProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface Material {
  id: number;
  url: string;
  name: string;
  type: number;
}

const CoverSelect: React.FC<CoverSelectProps> = ({ open, onClose, onSelect }) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [total, setTotal] = useState(0);
  const fetchMaterials = async () => {
    try {
      // 只获取图片类型的物料
      const res = await api.post(apiConfig.Material.getall + '?page=' + page + '&pageSize=' + pageSize, {
        filters: [
          {
            key: 'mineType',
            value: '1',
            op: 'equals',
          },
        ],
      });
      if (res.data.status === 200) {
        setMaterials(res.data.msg.data);
        setTotal(res.data.msg.counts);
      }
    } catch {
      message.error('获取物料列表失败');
    }
  };

  useEffect(() => {
    if (open) {
      fetchMaterials();
    }
  }, [open, page, pageSize]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (!selectedId) {
      message.warning('请选择一张图片');
      return;
    }
    onSelect(materials.find(material => material.id === selectedId)?.url || '');
    onClose();
  };

  return (
    <Modal title="选择封面" open={open} onCancel={onClose} width={800} onOk={handleConfirm} okText="确定" cancelText="取消">
      <div className="grid grid-cols-4 gap-4">
        {materials.map(material => (
          <div key={material.id} className="flex flex-col items-center">
            <div className={` cursor-pointer border-2 border-solid rounded-lg overflow-hidden ${selectedId === material.id ? 'border-[#1890ff]' : 'border-transparent'}`} onClick={() => handleSelect(material.id)}>
              <img src={material.url} alt={material.name} className="w-[80px] h-[80px] object-cover" />
            </div>
            <div className="p-2 text-center truncate">{material.name}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </Modal>
  );
};

export default CoverSelect;
