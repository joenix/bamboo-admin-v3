import {
  Show,
  SimpleShowLayout,
  useRecordContext,
  TextField,
  TopToolbar,
  EditButton,
} from "../../utils/dep";

const RoleShow = () => {
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
          <div className="title">描述:</div>
          <TextField source="description" label="描述" />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />} title="角色详情">
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default RoleShow;
