import { useParams } from "../../utils/dep";

const MaterialShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>物料详情:{id}</div>;
};

export default MaterialShow;
