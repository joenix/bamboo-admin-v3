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
 * @param choices  数据源列表
 * @param source   对应数据中的字段名
 * @returns
 */
const ImgSelect = ({ source, choices, label }) => {
  let {
    field: { value, onChange },
  } = useInput({ source });

  const [img, setImg] = useState({ url: "" });

  useEffect(() => {
    if (!choices) return null;

    let selectedImg = choices.find((img) => img.url === value);

    // Set Default
    selectedImg = selectedImg || choices[0];

    setImg(selectedImg);
  }, [choices]);

  const handleChange = (event) => {
    const selectedUrl = event.target.value;
    const selectedImg = choices.find((img) => img.url === selectedUrl);

    // 更新本地
    setImg(selectedImg);

    // 更新表单
    onChange(selectedUrl);
  };

  return (
    <div className="ImgSelect">
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id={`${source}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${source}-select-label`}
          value={img.url}
          onChange={handleChange}
          label={label}
        >
          {choices.map((img) => (
            <MenuItem key={img.id} value={img.url}>
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
