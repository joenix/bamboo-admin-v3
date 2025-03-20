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

const GiftShow = () => {
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
          <div className="title">礼品名称:</div>
          <TextField source="name" label="礼品名称" />
        </div>
        <div className="viewContainer">
          <div className="title">所需积分:</div>
          <TextField source="credit" label="所需积分" />
        </div>
        <div className="viewContainer">
          <div className="title">礼品图片:</div>
          <ImageField source="image.src" title="图片" label="头像" />
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

export default GiftShow;
