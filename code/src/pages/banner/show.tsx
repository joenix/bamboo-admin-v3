import { useParams } from "../../utils/dep";

const BannerShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>Show:{id}</div>;
};

export default BannerShow;
