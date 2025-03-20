import {
  SimpleForm,
  SelectInput,
  TextInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  NumberInput,
} from "../../utils/dep";

// Use Config
import { TypeList, GenderList } from "./config";

// Use Components
import { UpLoad } from "../../components";
import FormCore from "./formCore";

const TeachCreate = () => {
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
        <FormCore />
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
    <Create title="新建师资">
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Create>
  );
};

export default TeachCreate;
