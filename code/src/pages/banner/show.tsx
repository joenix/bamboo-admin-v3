import { useParams, useRecordContext } from "../../utils/dep";

const BannerShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();

  const record = useRecordContext();

  // if (!record) return null;

  console.log("Record:", record); // 打印当前记录的数据

  return <div>轮播图详情:{id}</div>;
};

export default BannerShow;
