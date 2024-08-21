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
  RouterLink,
  BooleanInput,
  SelectInput,
  useState,
  useResourceContext,
} from "../../utils/dep";

// Use Components
import { VideoField, Confirmdialog } from "../../components";

// Use Icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Use Config
import { LinkList } from "./config";

const BannerList = () => {
  const [dialogvisible, setDialogvisible] = useState(false);
  const [curId, setCurId] = useState(null);

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

  // 搜索
  const postFilters = [
    <SearchInput placeholder="请搜索" source="id" alwaysOn />,
    <TextInput label="名字" source="name" defaultValue="" />,
    <SelectInput source="linkType" choices={LinkList} label="链接类型" />,
    <BooleanInput label="是否启用" source="used" />,
  ];

  // 处理删除
  const handleDel = (event, id) => {
    event.stopPropagation();
    setDialogvisible(true);
    setCurId(id);
  };

  const dialogclose = () => {
    setCurId(null);
    setDialogvisible(false);
  };

  const dialogconfirm = () => {
    // 1. 走删除单个接口

    // 2. 关闭弹窗
    dialogclose();
  };

  const CustomActions = ({ record }) => (
    <div className="buttonGroup">
      <Button
        component={RouterLink}
        color="primary"
        variant="contained"
        startIcon={<EditIcon />}
        to={`/${useResourceContext()}/${record.id}`}
        label="编辑"
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></Button>

      <Button
        onClick={(e) => handleDel(e, record.id)}
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        label="删除"
      ></Button>
    </div>
  );

  return (
    <>
      <List actions={<ListActions />} filters={postFilters}>
        <Datagrid>
          <TextField source="name" label="名字" sortable={false} />
          <TextField source="content" label="内容" sortable={false} />
          <TextField source="index" label="排序" sortable={false} />
          <BooleanField source="used" label="是否启用" sortable={false} />
          <ImageField source="img" title="图片" label="图片" sortable={false} />
          <UrlField source="link" label="跳转链接" sortable={false} />
          <VideoField source="video" label="视频" sortable={false} />
          <SelectField
            source="linkType"
            choices={LinkList}
            label="链接类型"
            sortable={false}
          />
          <FunctionField
            label="操作"
            render={(record) => <CustomActions record={record} />}
          />
        </Datagrid>
      </List>
      <Confirmdialog
        open={dialogvisible}
        title="提示"
        description="确定要删除这条数据吗"
        onClose={dialogclose}
        onConfirm={dialogconfirm}
      ></Confirmdialog>
    </>
  );
};

export default BannerList;
