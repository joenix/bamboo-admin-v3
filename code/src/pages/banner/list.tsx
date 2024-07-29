import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  Button,
  BooleanField,
  ImageField,
  SelectField,
  UrlField,
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  SearchInput,
  TextInput,
  usePermissions,
  useListContext,
  RefreshButton,
} from "../../utils/dep";

// Use Components
import { VideoField } from "../../components";

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
      编辑
    </Button>
    <Button onClick={(e) => handleCancel(e, record.id)} color="secondary">
      删除
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

const BannerList = () => {
  const LinkList = [
    { id: "1", name: "外部链接" },
    { id: "2", name: "小程序链接" },
  ];

  // 搜索
  const postFilters = [
    <SearchInput placeholder="请搜索" source="id" alwaysOn />,
    <TextInput label="标题" source="title1" defaultValue="111" />,
    <TextInput label="年龄" source="title2" defaultValue="222" />,
    <TextInput label="学校" source="title3" defaultValue="333" />,
  ];

  return (
    <List actions={<ListActions />} filters={postFilters}>
      <Datagrid>
        <TextField source="id" label="id" />
        <TextField source="name" label="名字" />
        <TextField source="content" label="内容" />
        <TextField source="index" label="排序" />
        <BooleanField source="used" label="是否使用" />
        <ImageField source="img" title="图片" label="图片" />
        <UrlField source="link" label="跳转链接" />
        <VideoField source="video" />
        <SelectField source="linkType" choices={LinkList} label="链接类型" />
        <FunctionField
          label="操作"
          render={(record) => <CustomActions record={record} />}
        />
      </Datagrid>
    </List>
  );
};

export default BannerList;
