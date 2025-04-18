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

const BookEdit = () => {
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

    // 请求物料-图片库
    const ImgList = [
      {
        id: 1,
        name: "风景",
        url: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      },
      {
        id: 2,
        name: "写实",
        url: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      },
      {
        id: 3,
        name: "人物",
        url: "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
      },
    ];

    // 请求物料 - 视频库
    const VodeoList = [
      {
        id: 1,
        name: "火影忍者",
        url: video,
      },
      {
        id: 2,
        name: "灌篮高手",
        url: "https://vdept3.bdstatic.com/mda-qcsi39qagaesy86k/cae_h264/1711546069015176164/mda-qcsi39qagaesy86k.mp4?v_from_s=hkapp-haokan-suzhou&auth_key=1722426373-0-0-23c7ecffb58901eeaf2b4247f9650664&bcevod_channel=searchbox_feed&pd=1&cr=0&cd=0&pt=3&logid=2773108710&vid=7863036942044162201&klogid=2773108710&abtest=",
      },
    ];

    // 请求物料 - 书库
    const BookList = [
      {
        id: 1,
        name: "孟子",
        url: "http://www.mengzi.com",
      },
      {
        id: 2,
        name: "孔子",
        url: "http://www.kongzi.com",
      },
    ];

    return (
      <>
        <div className="viewContainer">
          <div className="title">图书ID:</div>
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
    <Edit title="编辑图书" actions={<EditActions />}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default BookEdit;
