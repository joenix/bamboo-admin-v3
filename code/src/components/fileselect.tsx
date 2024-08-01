// Use React
import { useEffect, useState } from "react";

// Use Dep
import {
  Select,
  MenuItem,
  useInput,
  InputLabel,
  FormControl,
  UrlField,
} from "../utils/dep";

/**
 *
 * @param choices  数据源列表
 * @param source   对应数据中的字段名
 * @returns
 */
const FileSelect = ({ source, choices, label }) => {
  let {
    field: { value, onChange },
  } = useInput({ source });

  const [file, setfile] = useState({ url: "" });

  useEffect(() => {
    if (!choices) return null;

    let selectedFile = choices.find((file) => file.url === value);

    // Set Default
    selectedFile = selectedFile || choices[0];

    setfile(selectedFile);
  }, [choices]);

  const handleChange = (event) => {
    const selectedUrl = event.target.value;
    const selectedFile = choices.find((file) => file.url === selectedUrl);

    // 更新本地
    setfile(selectedFile);

    // 更新表单
    onChange(selectedUrl);
  };

  return (
    <div className="FileSelect">
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id={`${source}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${source}-select-label`}
          value={file.url}
          onChange={handleChange}
          label={label}
        >
          {choices.map((file) => (
            <MenuItem key={file.id} value={file.url}>
              {file.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {file && (
        <UrlField className="preview" defaultValue={file.url}></UrlField>
      )}
    </div>
  );
};

export default FileSelect;
