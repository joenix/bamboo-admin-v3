import {
  Show,
  SimpleShowLayout,
  useRecordContext,
  TextField,
  ImageField,
  TopToolbar,
  EditButton,
  RichTextField,
} from "../../utils/dep";

// Use Components
import { VideoField } from "../../components";

const InformationShow = () => {
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
          <div className="title">资讯标题:</div>
          <TextField source="name" label="名称" />
        </div>
        <div className="viewContainer">
          <div className="title">资讯内容:</div>
          <RichTextField source="content" className="imformation-rich-field" />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />} title="资讯详情">
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default InformationShow;
