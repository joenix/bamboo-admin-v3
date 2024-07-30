import {
  SimpleForm,
  useRecordContext,
  Edit,
  TopToolbar,
  TextField,
  UrlField,
  BooleanField,
  ImageField,
  SelectField,
  Button,
  RouterLink,
} from "../../utils/dep";

// Use Icon
import InfoIcon from "@mui/icons-material/Info";

// Use Config
import { LinkList } from "./config";

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

    return (
      <>
        <div className="viewContainer">
          <div className="title">ID：</div>
          <TextField source="id" label="ID" />
        </div>
        <div className="viewContainer">
          <div className="title">名称：</div>
          <TextField source="name" label="名称" />
        </div>
        <div className="viewContainer">
          <div className="title">内容：</div>
          <TextField source="content" label="内容" />
        </div>
        <div className="viewContainer">
          <div className="title">排序：</div>
          <TextField source="index" label="排序" />
        </div>
        <div className="viewContainer">
          <div className="title">链接类型:</div>
          <SelectField source="linkType" choices={LinkList} label="链接类型" />
        </div>
        <div className="viewContainer">
          <div className="title">跳转链接：</div>
          <UrlField source="link" label="链接" />
        </div>
        <div className="viewContainer">
          <div className="title">是否使用：</div>
          <BooleanField source="used" label="是否使用" />
        </div>
        <div className="viewContainer">
          <div className="title">图片：</div>
          <ImageField source="img" title="图片" label="图片" />
        </div>
      </>
    );
  };

  return (
    <Edit title="编辑轮播" actions={<EditActions />}>
      <SimpleForm>
        <View />
      </SimpleForm>
    </Edit>
  );
};

export default BannerEdit;
