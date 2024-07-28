import { useParams } from "../../utils/dep";

const TeacherShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>师资详情:{id}</div>;
};

export default TeacherShow;
