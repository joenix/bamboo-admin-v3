import { useParams } from "../../utils/dep";

const BookShow = () => {
  console.log("useParams", useParams());
  const { id } = useParams();
  return <div>图书详情:{id}</div>;
};

export default BookShow;
