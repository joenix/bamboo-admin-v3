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
  useNotify,
  useRedirect,
  useUpdate,
  useInput,
} from "../../utils/dep";

// Use Icon
import InfoIcon from "@mui/icons-material/Info";

// Use Config
import { api } from "@/http";

// Use Components
import { ImgSelect, UpLoad } from "../../components";

// Use Kit
import { httpClient } from "../../utils/kit";
import FormCore from "./formCore";

const GiftEdit = () => {
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
        <FormCore />
      </>
    );
  };

  // 自定义工具栏
  const CustomToolbar = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const [update] = useUpdate();
    const onSuccess = (data) => {
      notify("更新成功");
      redirect("/Gift");
    };

    return (
      <Toolbar {...props} className="buttonGroup">
        <SaveButton
          label="更新"
          // type="button"
          // mutationOptions={{ onSuccess }}
        />
      </Toolbar>
    );
  };

  return (
    <Edit actions={<EditActions />} mutationMode="pessimistic">
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default GiftEdit;
