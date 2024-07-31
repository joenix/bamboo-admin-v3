import {
  Show,
  SimpleShowLayout,
  useRecordContext,
  TextField,
  UrlField,
  BooleanField,
  ImageField,
  SelectField,
  TopToolbar,
  EditButton,
} from "../../utils/dep";

// Use Config
import { LinkList } from "./config";

// Use Components
import { VideoField } from "../../components";

const BannerShow = () => {
  const ShowActions = () => {
    return (
      <TopToolbar>
        <EditButton label="编辑" />
      </TopToolbar>
    );
  };

  const View = () => {
    const record = useRecordContext();

    if (!record) return null;

    return (
      <>
        <div className="viewContainer">
          <div className="title">ID:</div>
          <TextField source="id" label="ID" />
        </div>
        <div className="viewContainer">
          <div className="title">名称:</div>
          <TextField source="name" label="名称" />
        </div>
        <div className="viewContainer">
          <div className="title">内容:</div>
          <TextField source="content" label="内容" />
        </div>
        <div className="viewContainer">
          <div className="title">排序:</div>
          <TextField source="index" label="排序" />
        </div>
        <div className="viewContainer">
          <div className="title">链接类型:</div>
          <SelectField source="linkType" choices={LinkList} label="链接类型" />
        </div>
        <div className="viewContainer">
          <div className="title">跳转链接:</div>
          <UrlField source="link" label="链接" />
        </div>
        <div className="viewContainer">
          <div className="title">是否使用:</div>
          <BooleanField source="used" label="是否使用" />
        </div>
        <div className="viewContainer">
          <div className="title">视频:</div>
          <VideoField source="video" />
        </div>
        <div className="viewContainer">
          <div className="title">图片:</div>
          <ImageField source="img" title="图片" label="图片" />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />}>
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default BannerShow;
