import { useParams } from "../../utils/dep";

const RoleShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>角色详情:{id}</div>;
};

export default RoleShow;
