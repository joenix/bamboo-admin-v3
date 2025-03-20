import {
  TextField,
  useRecordContext,
  Show,
  SimpleShowLayout,
  DateField,
  ImageField,
} from "@/utils/dep";

const UserShow = () => {
  const View = () => {
    const record = useRecordContext();

    if (!record) return null;

    return (
      <>
        <div className="viewContainer">
          <div className="title">用户ID:</div>
          <TextField source="id" label="ID" />
        </div>
        <div className="viewContainer">
          <div className="title">用户名:</div>
          <TextField source="username" label="用户名" />
        </div>
        <div className="viewContainer">
          <div className="title">手机号:</div>
          <TextField source="mobile" label="手机号" />
        </div>
        <div className="viewContainer">
          <div className="title">昵称:</div>
          <TextField source="nickname" label="昵称" />
        </div>
        <div className="viewContainer">
          <div className="title">头像:</div>
          <ImageField source="avatarUrl" label="头像" />
        </div>
        <div className="viewContainer">
          <div className="title">注册时间:</div>
          <DateField source="registerTime" showTime label="注册时间" />
        </div>
        <div className="viewContainer">
          <div className="title">最近活跃时间:</div>
          <DateField source="lastActiveTime" showTime label="最近活跃时间" />
        </div>
      </>
    );
  };

  return (
    <Show title="用户详情" actions={<></>}>
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default UserShow;
