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
  DeleteButton,
} from "../../utils/dep";

// Use Icon
import InfoIcon from "@mui/icons-material/Info";

// Use Config
import { LinkList } from "./config";

// Use Components
import { ImgSelect } from "../../components";

const BannerEdit = () => {
  const EditActions = () => {
    const record = useRecordContext();

    if (!record) return null;
    return (
      <TopToolbar>
        <Button
          component={RouterLink}
          startIcon={<InfoIcon />}
          to={`/banner/${record.id}/show`}
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

    return (
      <>
        <div className="viewContainer">
          <div className="title">ID：</div>
          <TextField source="id" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">名称：</div>
          <TextInput source="name" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">内容：</div>
          <TextInput source="content" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">排序：</div>
          <TextInput source="index" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">链接类型:</div>
          <SelectInput source="linkType" choices={LinkList} label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">跳转链接：</div>
          <TextInput source="link" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">是否使用：</div>
          <BooleanInput source="used" label={false} />
        </div>
        <div className="viewContainer">
          <div className="title">图片：</div>
          <ImgSelect source="img" choices={ImgList} label="选择图片" />
        </div>
      </>
    );
  };
  // 自定义工具栏
  const CustomToolbar = (props) => (
    <Toolbar {...props} className="buttonGroup">
      <SaveButton label="保存" />
      <DeleteButton label="删除" />
    </Toolbar>
  );

  return (
    <Edit title="编辑轮播" actions={<EditActions />}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default BannerEdit;
