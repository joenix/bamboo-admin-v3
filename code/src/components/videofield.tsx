import { useEffect } from "react";
import { useRecordContext } from "../utils/dep";

const VideoField = ({ source }) => {
  // 获取上下文数据
  const record = useRecordContext();

  useEffect(() => {
    if (!record) return null;
  }, [record]);

  return (
    <>
      <video width="150" height="100" controls>
        <source src={record[source]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default VideoField;
