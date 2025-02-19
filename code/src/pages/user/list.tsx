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

const CustomActions = ({ record }) => (
  <div className="buttonGroup transparent">
    <EditButton label="编辑" />
    <ShowButton label="查看" />
  </div>
);

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
        <NumberField source="id" />
        <TextField source="isAdult" label="昵称" />
        <ImageField source="avator" title="头像" label="头像" />
        <DateField source="birthday" label="注册时间" />
        <DateField source="birthday" label="最近活跃时间" />
        <FunctionField
          label="操作"
          render={(record) => <CustomActions record={record} />}
        />
      </Datagrid>
    </List>
  );
};

export default UserList;
