import { useEffect, useState } from "react";
import { Table, Button, Space, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";
import api from "@/api";
import { apiConfig } from "@/api/config";
import dayjs from "dayjs";
// {
//   "id": 1,
//   "url": "https://oss.lhdd.club/banner_1.webp",
//   "link": "https://oss.lhdd.club/banner_1.webp",
//   "name": "article_1",
//   "content": null,
//   "type": 1,
//   "delete": false,
//   "createdAt": "2024-11-11T19:43:12.000Z",
//   "updatedAt": "2024-11-11T19:43:12.000Z"
// }
const Material = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "物料类型",
      dataIndex: "type",
      key: "type",
      render: (text: number) => {
        /**
         *  1 图片
         *  2 视频
         *  3 书
         *  4 音乐
         *  5 附件
         */
        switch (text) {
          case 1:
            return "图片";
          case 2:
            return "视频";
          case 4:
            return "音频";
          default:
            return "未知";
        }
      },
    },
    {
      title: "备注",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link",
      render: (
        text: string,
        record: {
          type: number;
          url: string | undefined;
          link: string | undefined;
        }
      ) => {
        /**
         *  1 图片
         *  2 视频
         *  3 书
         *  4 音乐
         *  5 附件
         */
        switch (record.type) {
          case 1:
            return <img className="w-10 h-10" src={record.url} alt="图片" />;
          case 2:
            return <video className="w-10 h-10" src={record.link} controls />;
          case 4:
            return <audio className="w-10 h-10" src={record.link} controls />;
          default:
            return record.link || record.url;
        }
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => {
        // 2024-11-11T19:43:12.000Z
        const date = new Date(text);
        // 使用 dayjs 处理时间，并转换为北京时间
        return dayjs(date).add(-8, "hour").format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>查看</a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api
      .post(
        apiConfig.Material.getall + "?page=" + page + "&pageSize=" + pageSize
      )
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.msg.data);
          setTotal(res.data.msg.counts);
        }
        setLoading(false);
      });
  }, [page, pageSize]);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />}>
            新增素材
          </Button>
        </div>

        <Card>
          <Table
            loading={loading}
            rowKey={"id"}
            columns={columns}
            dataSource={data}
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
            }}
          />
        </Card>
      </div>
    </PageContainer>
  );
};

export default Material;
