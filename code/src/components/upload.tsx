// Use Dep
import { Mbutton } from "../utils/dep";

// Use Styled
import { styled } from "@mui/material/styles";

// Use Icon
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpLoad = ({ accept, onChange }) => {
  // Custom Styled
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Mbutton
      component="label"
      role={undefined}
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      点击上传
      <VisuallyHiddenInput
        type="file"
        accept={accept}
        onChange={onChange}
        required
        multiple
      />
    </Mbutton>
  );
};

export default UpLoad;
