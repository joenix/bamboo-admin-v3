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

// 定义操作按钮的回调函数
const handleConfirm = (event, id) => {
  event.stopPropagation();
  console.log("Confirm clicked for ID:", id);
  // 处理确认逻辑
};

const handleCancel = (event, id) => {
  event.stopPropagation();
  console.log("Cancel clicked for ID:", id);
  // 处理取消逻辑
};

const CustomActions = ({ record }) => (
  <div>
    <Button onClick={(e) => handleConfirm(e, record.id)} color="primary">
      确认
    </Button>
    <Button onClick={(e) => handleCancel(e, record.id)} color="secondary">
      取消
    </Button>
  </div>
);

const ListActions = () => {
  const { total, isPending } = useListContext();
  const { permissions } = usePermissions();

  return (
    <TopToolbar>
      <FilterButton disableSaveQuery={true} />
      <CreateButton label="新建" />
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
      <Datagrid>
        <ChipField source="rank" />
        <DateField source="birthday" label="出生" />
        <BooleanField source="isAdult" label="是否成年" />
        <EmailField source="email" label="邮箱" />
        <NumberField source="money" />
        <RichTextField source="signature" label="签名" />
        <SelectField
          source="hobby"
          choices={hobbyList}
          optionText="name"
          optionValue="id"
          label="兴趣"
        />

        <ArrayField source="tags">
          <SingleFieldList>
            <TextField source="name" />
          </SingleFieldList>
        </ArrayField>

        <FileField source="file" title="点击下载" label="文件" />
        <TextField source="company.name" label="公司" />
        <UrlField source="website" />
        <ImageField source="avator" title="头像" label="头像" />
        <FunctionField
          label="操作"
          render={(record) => <CustomActions record={record} />}
        />
        <>
          <EditButton label="编辑" />
          <ShowButton label="查看" />
        </>
      </Datagrid>
    </List>
  );
};

export default UserList;
