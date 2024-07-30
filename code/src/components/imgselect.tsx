// Use React
import { useEffect, useState } from "react";

// Use Dep
import { Select, MenuItem, InputLabel, FormControl } from "../utils/dep";

/**
 *
 * @param datasource  图片数据源列表
 * @param cururl      当前图片地址
 * @returns
 */
const ImgSelect = ({ datasource, cururl }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    if (!datasource || !cururl) return;
    const selectedImg = datasource.find((img) => img.url === cururl);
    setImg(selectedImg);
  }, [datasource, cururl]);

  const handleChange = (event) => {
    const selectedImg = datasource.find(
      (img) => img.url === event.target.value
    );
    setImg(selectedImg);
  };

  return (
    <div className="ImgSelect">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="img-select-label">选择图片</InputLabel>
        <Select value={img?.url || ""} onChange={handleChange} label="选择图片">
          {datasource.map((img) => (
            <MenuItem key={img.url} value={img.url}>
              {img.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {img && <img className="preview" src={img.url} alt="预览图片" />}
    </div>
  );
};

export default ImgSelect;
