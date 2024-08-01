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

// Use Components
import { VideoField } from "../../components";

const BookShow = () => {
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
          <div className="title">书名:</div>
          <TextField source="name" label="书名" />
        </div>
        <div className="viewContainer">
          <div className="title">内容:</div>
          <TextField source="content" label="内容" />
        </div>
        <div className="viewContainer">
          <div className="title">链接:</div>
          <UrlField source="url" label="链接" />
        </div>
        <div className="viewContainer">
          <div className="title">图片:</div>
          <ImageField source="img" title="图片" label="图片" />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />} title="图书详情">
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default BookShow;
