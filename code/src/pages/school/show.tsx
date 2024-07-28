import { useParams } from "../../utils/dep";

const SchoolShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>机构详情:{id}</div>;
};

export default SchoolShow;
