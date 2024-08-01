import {
  SimpleForm,
  SelectInput,
  TextInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  useState,
  ImageInput,
  FileInput,
  ImageField,
  FileField,
  useNotify,
  Mbutton,
} from "../../utils/dep";

// Use Config
import { TypeList } from "./config";

// Use Icon
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Use Styled
import { styled } from "@mui/material/styles";

const MaterialCreate = () => {
  const View = () => {
    const [selectedType, setSelectedType] = useState("1");

    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };

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

    // 自定义上传
    const renderUploader = () => {
      switch (selectedType) {
        // 图片
        case "1":
          return (
            <Mbutton
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              点击上传
              <VisuallyHiddenInput type="file" accept="image/*" />
            </Mbutton>
          );
        // 视频
        case "2":
          return (
            <Mbutton
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              点击上传
              <VisuallyHiddenInput type="file" accept="video/*" />
            </Mbutton>
          );
        // 书
        case "3":
          return (
            <Mbutton
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              点击上传
              <VisuallyHiddenInput type="file" accept="application/*" />
            </Mbutton>
          );
        // 音乐
        case "4":
          return (
            <Mbutton
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              点击上传
              <VisuallyHiddenInput type="file" accept="audio/*" />
            </Mbutton>
          );
        // 附件
        case "5":
          return (
            <Mbutton
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              点击上传
              <VisuallyHiddenInput type="file" accept="application/*" />
            </Mbutton>
          );
      }
    };

    return (
      <>
        <div className="viewContainer">
          <div className="title">物料类型:</div>
          <SelectInput
            source="type"
            choices={TypeList}
            defaultValue={"1"}
            label="物料类型"
            validate={[required()]}
            onChange={handleTypeChange}
          />
        </div>
        <div className="viewContainer">
          <div className="title">名称:</div>
          <TextInput source="name" label="名称" validate={[required()]} />
        </div>
        <div className="viewContainer">
          <div className="title">内容:</div>
          <TextInput source="content" label="内容" validate={[required()]} />
        </div>
        <div className="viewContainer">
          <div className="title">上传:</div>
          {renderUploader()}
        </div>
      </>
    );
  };
  // 自定义工具栏
  const CustomToolbar = (props) => {
    return (
      <Toolbar {...props} className="buttonGroup">
        <SaveButton label="保存" />
      </Toolbar>
    );
  };

  return (
    <Create>
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Create>
  );
};

export default MaterialCreate;
