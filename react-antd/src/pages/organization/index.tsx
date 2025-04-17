import { Table, Button, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import api from "@/api";
import { apiConfig } from "@/api/config";
import DrawerForm from "@/pages/organization/components/DrawerForm";

interface OrganizationData {
  id: number;
  type: string;
  name: string;
  address: string;
  remark: string;
  remark0: string;
  remark1: string;
  remark2: string;
  remark3: string;
  remark4: string;
  img: string;
}

export default function Organization() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [currentRecord, setCurrentRecord] = useState<OrganizationData | null>(
    null
  );
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<OrganizationData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const TypeList = [
    { id: "0", name: "授权机构" },
    { id: "1", name: "培训机构" },
    { id: "2", name: "学校" },
  ];
  const columns = [
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (type: string) => TypeList.find((item) => item.id === type)?.name,
    },
    {
      title: "机构名称",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "机构描述",
      dataIndex: "remark",
      key: "remark",
      ellipsis: true,
    },
    {
      title: "机构图片",
      dataIndex: "img",
      key: "img",
      render: (img: string) => (
        <img src={img} alt="机构图片" className="w-10 h-10 rounded-full" />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: OrganizationData) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setDrawerTitle("新增机构");
    setCurrentRecord(null);
    setDrawerVisible(true);
  };

  const handleEdit = (record: OrganizationData) => {
    setDrawerTitle("编辑机构");
    setCurrentRecord({
      ...record,
      remark0: record.remark.split(",")[0],
      remark1: record.remark.split(",")[1],
      remark2: record.remark.split(",")[2],
      remark3: record.remark.split(",")[3],
      remark4: record.remark.split(",")[4],
    });
    setDrawerVisible(true);
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .post(apiConfig.School.delete, {
        id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          message.success("删除成功");
          setData(data.filter((item) => item.id !== id));
        }
        setLoading(false);
      });
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const remark = [
        values.remark0,
        values.remark1,
        values.remark2,
        values.remark3,
        values.remark4,
      ].join(",");
      if (currentRecord) {
        // 编辑
        const res = await api.post(apiConfig.School.update, {
          content: values.address,
          img: values.img,
          name:
            TypeList.find((item) => item.id === values.type)?.name +
            "," +
            values.name,
          type: values.type,
          video: values.video,
          id: currentRecord.id,
          remark,
        });
        if (res.data.status === 200) {
          message.success("编辑成功");
        }
      } else {
        // 新增
        const res = await api.post(apiConfig.School.create, {
          content: values.address,
          img: values.img,
          name:
            TypeList.find((item) => item.id === values.type)?.name +
            "," +
            values.name,
          type: values.type,
          video: values.video,
          remark,
        });
        if (res.data.status === 200) {
          message.success("新增成功");
        }
      }
      setRefresh(!refresh);
    } catch (error) {
      console.error("操作失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const filters: any[] = [];
    api
      .post(
        apiConfig.School.getall + "?page=" + page + "&pageSize=" + pageSize,
        {
          filters,
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          const formattedData = res.data.msg.data.map((item: any) => {
            const name = item.name.split(",");
            return {
              ...item,
              address: item.content,
              name: name[1],
            };
          });
          setData(formattedData);
          setTotal(res.data.msg.counts);
        }
        setLoading(false);
        setRefresh(false);
      });
  }, [page, pageSize, refresh]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加机构
          </Button>
        </div>
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 380px)" }}
          className="[&_.ant-table-body]:!h-[calc(100vh-380px)]"
          loading={loading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 共 ${total} 条`,
            locale: {
              items_per_page: "条/页",
              jump_to: "跳至",
              jump_to_confirm: "确定",
              page: "页",
              prev_page: "上一页",
              next_page: "下一页",
              prev_5: "向前 5 页",
              next_5: "向后 5 页",
              prev_3: "向前 3 页",
              next_3: "向后 3 页",
            },
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            hideOnSinglePage: false,
          }}
        />
        {drawerVisible && (
          <DrawerForm
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            onSubmit={handleSubmit}
            initialValues={currentRecord}
            title={drawerTitle}
          />
        )}
      </div>
    </PageContainer>
  );
}
