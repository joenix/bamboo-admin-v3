import {
  SimpleForm,
  SelectInput,
  TextInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  useState,
  Mbutton,
} from "../../utils/dep";

// Use Config
import { TypeList } from "./config";

// Use Icon
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Use Styled
import { styled } from "@mui/material/styles";

// Use Kit
import { httpClient } from "../../utils/kit";

// Use Api
import { api } from "../../http";

const MaterialCreate = () => {
  const View = () => {
    const [selectedType, setSelectedType] = useState("1");

    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };

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

    const upload = async (e) => {
      const { files } = e.target;

      // New FormData
      const formData = new FormData();

      // Add files to FormData
      Array.from(files).forEach((file, index) => {
        formData.append(`files`, file);
      });

      // Upload File For Urls
      const urls = await httpClient.post(api.Public.upload, {
        data: formData,
      });

      // console.log("urls", urls);
    };

    // 自定义上传
    const renderUploader = () => {
      let accept = "";
      switch (selectedType) {
        // 图片
        case "1":
          accept = "image/*";
          break;
        // 视频
        case "2":
        // 附件
        case "5":
          accept = "video/*";
          break;
        // 书
        case "3":
          accept = "application/*";
          break;
        // 音乐
        case "4":
          accept = "audio/*";
          break;
      }

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
            onChange={upload}
            required
            multiple
          />
        </Mbutton>
      );
    };

    return (
      <>
        <div className="viewContainer">
          <div className="title">物料类型:</div>
          <SelectInput
            variant="outlined"
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
          <TextInput
            source="name"
            label="名称"
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">内容:</div>
          <TextInput
            source="content"
            label="内容"
            validate={[required()]}
            variant="outlined"
          />
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
