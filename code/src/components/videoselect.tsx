// Use React
import { useEffect, useState, useRef } from "react";

// Use Dep
import {
  Select,
  MenuItem,
  useInput,
  InputLabel,
  FormControl,
} from "../utils/dep";

/**
 *
 * @param choices  图片数据源列表
 * @param source   对应数据中的图片字段名
 * @param cururl      当前图片地址
 * @returns
 */
const VideoSelect = ({ source, choices, label }) => {
  const {
    field: { value, onChange },
  } = useInput({ source });

  const [video, setVideo] = useState("");

  const videoRef = useRef(null);

  useEffect(() => {
    if (!choices || !value) return;
    const selectedVideo = choices.find((video) => video.url === value);
    setVideo(selectedVideo);
  }, [choices, value]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // 加载新的视频源
    }
  }, [video.url]); // 监听视频URL的变化

  const handleChange = (event) => {
    const selectedUrl = event.target.value;
    const selectedVideo = choices.find((video) => video.url === selectedUrl);

    // 更新本地
    setVideo(selectedVideo);

    // 更新表单
    onChange(selectedUrl);
  };

  return (
    <div className="VideoSelect">
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id={`${source}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${source}-select-label`}
          value={value || ""}
          onChange={handleChange}
          label={label}
        >
          {choices.map((video) => (
            <MenuItem key={video.url} value={video.url}>
              {video.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {video && (
        <video
          className="preview"
          ref={videoRef}
          width="200"
          height="150"
          controls
          style={{ marginTop: "16px", maxWidth: "100%", height: "auto" }}
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoSelect;
