import { useParams } from "../../utils/dep";

const InformationShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>咨询详情:{id}</div>;
};

export default InformationShow;
