// Use React
import { useEffect, useState } from "react";

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
const ImgSelect = ({ source, choices, label }) => {
  const {
    field: { value, onChange },
  } = useInput({ source });

  const [img, setImg] = useState("");

  useEffect(() => {
    if (!choices || !value) return;
    const selectedImg = choices.find((img) => img.url === value);
    setImg(selectedImg);
  }, [choices, value]);

  const handleChange = (event) => {
    const selectedUrl = event.target.value;
    const selectedImg = choices.find((img) => img.url === selectedUrl);

    // 更新本地图片
    setImg(selectedImg);

    // 更新表单的值
    onChange(selectedUrl);
  };

  return (
    <div className="ImgSelect">
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id={`${source}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${source}-select-label`}
          value={value || ""}
          onChange={handleChange}
          label={label}
        >
          {choices.map((img) => (
            <MenuItem key={img.url} value={img.url}>
              {img.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {img && (
        <img
          className="preview"
          src={img.url}
          alt="预览图片"
          style={{ marginTop: "16px", maxWidth: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default ImgSelect;
