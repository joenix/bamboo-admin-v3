import {
  SimpleForm,
  useRecordContext,
  Edit,
  TopToolbar,
  TextField,
  Button,
  TextInput,
  RouterLink,
  Toolbar,
  SaveButton,
  useResourceContext,
  required,
} from "../../utils/dep";

// Use Icon
import InfoIcon from "@mui/icons-material/Info";

// Use Components
import { ImgSelect, FileSelect } from "../../components";

// Test
import video from "../../static/video/SampleVideo.mp4";
import FormCore from "./formCore";

const CodeEdit = () => {
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

    // 请求物料 - 书库
    const BookList = [
      {
        id: "111",
        name: "孟子",
        url: "http://www.mengzi.com",
      },
      {
        id: "222",
        name: "孔子",
        url: "http://www.kongzi.com",
      },
    ];

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
    return (
      <Toolbar {...props} className="buttonGroup">
        <SaveButton label="保存" />
      </Toolbar>
    );
  };

  return (
    <Edit title="编辑激活码" actions={<EditActions />}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default CodeEdit;
