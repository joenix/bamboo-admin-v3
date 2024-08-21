import {
  SimpleForm,
  useRecordContext,
  Edit,
  TopToolbar,
  TextField,
  SelectInput,
  Button,
  TextInput,
  RouterLink,
  BooleanInput,
  Toolbar,
  SaveButton,
  NumberInput,
  useResourceContext,
  required,
  useState,
} from "../../utils/dep";

// Use Icon
import InfoIcon from "@mui/icons-material/Info";

// Use Config
import { TypeList } from "./config";

// Test
import video from "../../static/video/SampleVideo.mp4";

// Use Components
import { UpLoad } from "../../components";

const MaterialEdit = () => {
  const resouce = useResourceContext();
  const [selectedType, setSelectedType] = useState(1);

  const EditActions = () => {
    const record = useRecordContext();

    if (!record) return null;

    return (
      <TopToolbar>
        <Button
          component={RouterLink}
          startIcon={<InfoIcon />}
          to={`/${resouce}/${record.id}/show`}
          variant="text"
          color="primary"
          label="详情"
        ></Button>
      </TopToolbar>
    );
  };

  const View = () => {
    const record = useRecordContext();

    if (!record) return null;

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
          <div className="title">ID:</div>
          <TextField source="id" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">物料类型:</div>
          <SelectInput
            source="type"
            choices={TypeList}
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">名称:</div>
          <TextInput
            source="name"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">内容:</div>
          <TextInput
            source="content"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">跳转地址:</div>
          <TextInput
            source="link"
            label={false}
            variant="outlined"
            validate={[required()]}
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
    <Edit title="编辑物料" actions={<EditActions />}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default MaterialEdit;
