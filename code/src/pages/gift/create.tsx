import {
  SimpleForm,
  SelectInput,
  TextInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  NumberInput,
  ImageInput,
  ImageField,
} from "../../utils/dep";

// Use Components
import { UpLoad } from "../../components";

const GiftCreate = () => {
  const View = () => {
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
          <div className="title">礼品名称:</div>
          <TextInput
            source="name"
            label={false}
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">所需积分:</div>
          <NumberInput
            source="gender"
            label={false}
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">礼品图片:</div>
          {/* <UpLoad accept={"images/*"} onChange={upload}></UpLoad>
           */}
          <ImageInput source="image" placeholder="点击上传" label={false}>
            <ImageField source="src" title="礼品"></ImageField>
          </ImageInput>
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

export default GiftCreate;
