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
import { TypeList, GenderList } from "./config";

const TeachShow = () => {
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
          <div className="title">师资类型:</div>
          <SelectField source="type" choices={TypeList} label="师资类型" />
        </div>
        <div className="viewContainer">
          <div className="title">姓名:</div>
          <TextField source="name" label="名称" />
        </div>
        <div className="viewContainer">
          <div className="title">性别:</div>
          <TextField source="gender" label="性别" />
        </div>
        <div className="viewContainer">
          <div className="title">年龄:</div>
          <TextField source="age" label="年龄" />
        </div>
        <div className="viewContainer">
          <div className="title">个人介绍:</div>
          <TextField source="content" label="个人介绍" />
        </div>
        <div className="viewContainer">
          <div className="title">省:</div>
          <TextField source="province" label="省" />
        </div>
        <div className="viewContainer">
          <div className="title">市:</div>
          <TextField source="city" label="市" />
        </div>
        <div className="viewContainer">
          <div className="title">区:</div>
          <TextField source="area" label="区" />
        </div>
        <div className="viewContainer">
          <div className="title">头像:</div>
          <ImageField source="avatar" title="图片" label="头像" />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />} title="师资详情">
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default TeachShow;
