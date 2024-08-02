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
  ImageInput,
  ImageField,
  required,
} from "../../utils/dep";

// Use Icon
import InfoIcon from "@mui/icons-material/Info";

// Use Config
import { TypeList } from "./config";

// Use Components
import { ImgSelect, UpLoad } from "../../components";

// Use Kit
import { httpClient } from "../../utils/kit";

const TeachEdit = () => {
  const EditActions = () => {
    const record = useRecordContext();
    const resouce = useResourceContext();

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

      // console.log("urls", urls);
    };

    return (
      <>
        <div className="viewContainer">
          <div className="title">ID:</div>
          <TextField source="id" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">师资类型:</div>
          <SelectInput
            source="type"
            choices={TypeList}
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">姓名:</div>
          <TextInput
            source="name"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">性别:</div>
          <TextInput
            source="gender"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">年龄:</div>
          <TextInput
            source="age"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">个人介绍:</div>
          <TextInput
            source="content"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">省:</div>
          <TextInput
            source="province"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">市:</div>
          <TextInput
            source="city"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>
        <div className="viewContainer">
          <div className="title">区:</div>
          <TextInput
            source="area"
            label={false}
            variant="outlined"
            validate={[required()]}
          />
        </div>

        <div className="viewContainer">
          <div className="title">头像:</div>
          <>
            <UpLoad accept="images/*" onChange={upload}></UpLoad>
            <ImageField source="avatar"></ImageField>
          </>
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
    <Edit title="编辑轮播" actions={<EditActions />}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default TeachEdit;
