import { useParams } from "../../utils/dep";

const TipsShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>贴士集详情:{id}</div>;
};

export default TipsShow;
