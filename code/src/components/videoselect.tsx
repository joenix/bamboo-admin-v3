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
 * @param choices  数据源列表
 * @param source   对应数据中的字段名
 * @returns
 */
const VideoSelect = ({ source, choices, label }) => {
  let {
    field: { value, onChange },
  } = useInput({ source });

  const [video, setVideo] = useState({ url: "" });

  const videoRef = useRef(null);

  useEffect(() => {
    if (!choices) return null;

    let selectedVideo = choices.find((video) => video.url === value);

    // Set Default
    selectedVideo = selectedVideo || choices[0];

    setVideo(selectedVideo);
  }, [choices]);

  useEffect(() => {
    if (videoRef.current) {
      // Reload New Video
      videoRef.current.load();
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
          value={video.url}
          onChange={handleChange}
          label={label}
        >
          {choices.map((video) => (
            <MenuItem key={video.id} value={video.url}>
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
