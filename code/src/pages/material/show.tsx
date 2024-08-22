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
  DateField,
} from "../../utils/dep";

// Use Config
import { TypeList } from "./config";

// Use Components
import { VideoField } from "../../components";

const MaterialShow = () => {
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
          <div className="title">物料类型:</div>
          <SelectField source="type" choices={TypeList} label="物料类型" />
        </div>
        <div className="viewContainer">
          <div className="title">链接:</div>
          <UrlField source="url" label="链接" />
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
          <div className="title">跳转地址:</div>
          <UrlField source="link" label="跳转地址" />
        </div>
        <div className="viewContainer">
          <div className="title">创建时间:</div>
          <DateField source="createdAt" label="创建时间" showTime />
        </div>
        <div className="viewContainer">
          <div className="title">更新时间:</div>
          <DateField source="updatedAt" label="更新时间" showTime />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />} title="物料详情">
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default MaterialShow;
