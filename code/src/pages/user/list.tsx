import {
  Datagrid,
  EmailField,
  List,
  TextField,
  FunctionField,
  Button,
  ArrayField,
  SingleFieldList,
  BooleanField,
  ChipField,
  DateField,
  FileField,
  ImageField,
  NumberField,
  SelectField,
  RichTextField,
  UrlField,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  SearchInput,
  TextInput,
  usePermissions,
  useListContext,
  EditButton,
  ShowButton,
  RefreshButton,
} from "../../utils/dep";

const CustomActions = ({ record }) => {
  const handleClick = () => {};

  return (
    <div className="buttonGroup transparent">
      {/* <Button label="拉黑" onClick={handleClick} /> */}
      <ShowButton label="查看" />
    </div>
  );
};

const ListActions = () => {
  const { total, isPending } = useListContext();
  const { permissions } = usePermissions();

  return (
    <TopToolbar>
      <FilterButton disableSaveQuery={true} />
      {/* <CreateButton label="新建" /> */}
      <RefreshButton label="刷新" />
      <ExportButton label="导出" />
      {/* <ImportButton>: benwinding/react-admin-import-csv. */}
    </TopToolbar>
  );
};
const hobbyList = [
  { id: "death", name: "死神" },
  { id: "nija", name: "火影" },
];

// 搜索
const postFilters = [
  <SearchInput placeholder="请搜索" source="id" alwaysOn />,
  <TextInput label="标题" source="title1" defaultValue="111" />,
  <TextInput label="年龄" source="title2" defaultValue="222" />,
  <TextInput label="学校" source="title3" defaultValue="333" />,
];

const UserList = () => {
  return (
    <List actions={<ListActions />} filters={postFilters}>
      <Datagrid bulkActionButtons={false}>
        <NumberField source="id" sortable={false} />
        <TextField source="username" label="用户名" sortable={false} />
        <TextField source="mobile" label="手机号" sortable={false} />
        <TextField source="nickname" label="昵称" sortable={false} />
        <ImageField
          source="avatarUrl"
          title="头像"
          label="头像"
          sortable={false}
        />
        <DateField
          source="registerTime"
          label="注册时间"
          sortable={false}
          showTime
        />
        <DateField
          source="lastActiveTime"
          label="最近活跃时间"
          sortable={false}
          showTime
        />
        <FunctionField
          label="操作"
          render={(record) => <CustomActions record={record} />}
        />
      </Datagrid>
    </List>
  );
};

export default UserList;
