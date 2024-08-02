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
import { TypeList } from "./config";

const SchoolShow = () => {
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
          <div className="title">机构类型:</div>
          <SelectField source="type" choices={TypeList} label="机构类型" />
        </div>
        <div className="viewContainer">
          <div className="title">机构名:</div>
          <TextField source="name" label="机构名" />
        </div>
        <div className="viewContainer">
          <div className="title">机构介绍:</div>
          <TextField source="content" label="机构介绍" />
        </div>
        <div className="viewContainer">
          <div className="title">学校性质:</div>
          <TextField source="nature" label="学校性质" />
        </div>
        <div className="viewContainer">
          <div className="title">学校类别:</div>
          <TextField source="school_type" label="学校类别" />
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
          <div className="title">机构图:</div>
          <ImageField source="img" title="图片" label="机构图" />
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

export default SchoolShow;
