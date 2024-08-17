// Use Dep
import {
  SimpleForm,
  SelectInput,
  TextInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  useState,
  useFormContext,
} from "../../utils/dep";

// Use Config
import { TypeList } from "./config";

// Use Kit
import { httpClient } from "../../utils/kit";

// Use Api
import { api } from "../../http";

// Use Components
import { UpLoad } from "../../components";

const MaterialCreate = () => {
  const View = () => {
    const [selectedType, setSelectedType] = useState(1);
    const { setValue } = useFormContext();

    const handleTypeChange = (event) => {
      setSelectedType(Number(event.target.value));
    };

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

      // 绑定数据到form
      setValue("url", urls.files[0].path);
    };

    // 自定义上传
    const renderUploader = () => {
      let accept = "";

      switch (selectedType) {
        // 图片
        case 1:
          accept = "image/*";
          break;
        // 视频
        case 2:
          accept = "video/*";
          break;
        // 书
        case 3:
        // 附件
        case 5:
          accept = "application/*";
          break;
        // 音乐
        case 4:
          accept = "audio/*";
          break;
      }

      return <UpLoad accept={accept} onChange={upload}></UpLoad>;
    };

    return (
      <>
        <div className="viewContainer">
          <div className="title">物料类型:</div>
          <SelectInput
            variant="outlined"
            source="type"
            choices={TypeList}
            defaultValue={1}
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
          <div className="title">跳转地址:</div>
          <TextInput
            source="link"
            label="跳转地址"
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">链接:</div>
          <TextInput
            source="url"
            label="链接"
            variant="outlined"
            readOnly
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">上传物料:</div>
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
    <Create title="新建物料">
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Create>
  );
};

export default MaterialCreate;
