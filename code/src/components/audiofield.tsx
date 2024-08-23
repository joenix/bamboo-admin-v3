import { useEffect } from "react";
import { useRecordContext } from "../utils/dep";

const AudioField = ({ source }) => {
  // 获取上下文数据
  const record = useRecordContext();

  useEffect(() => {
    if (!record) return null;
  }, [record]);

  return (
    <>
      <audio width="150" height="100" controls>
        <source src={record[source]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioField;
