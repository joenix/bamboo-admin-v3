import { useParams } from "../../utils/dep";

const BannerShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>轮播图详情:{id}</div>;
};

export default BannerShow;
