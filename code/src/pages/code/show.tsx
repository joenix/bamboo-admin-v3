import { useParams } from "../../utils/dep";

const CodeShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>激活码详情:{id}</div>;
};

export default CodeShow;
