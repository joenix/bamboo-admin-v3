import { useParams } from "../../utils/dep";

const UserShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>用户详情:{id}</div>;
};

export default UserShow;
