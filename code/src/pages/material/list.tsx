import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  Button,
  SelectField,
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
  useState,
  DateField,
  UrlField,
  useResourceContext,
  useDataProvider,
  useRefresh,
  ImageField,
} from "../../utils/dep";

// Use Components
import { Confirmdialog, VideoField, AudioField } from "../../components";

// Use Icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Use Config
import { TypeList } from "./config";

const MaterialList = () => {
  const dataProvider = useDataProvider();
  const resource = useResourceContext();
  const [dialogvisible, setDialogvisible] = useState(false);
  const [curId, setCurId] = useState(null);
  const refresh = useRefresh();

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

  const dialogconfirm = async () => {
    // 1. 走删除单个接口
    await dataProvider.delete(resource, { id: curId });

    // 2. 关闭弹窗
    dialogclose();

    // 3. 刷新页面
    refresh();
  };

  const CustomActions = ({ record }) => (
    <div className="buttonGroup transparent">
      {/* <Button
        component={RouterLink}
        color="primary"
        variant="contained"
        startIcon={<EditIcon />}
        to={`/${resource}/${record.id}`}
        label="编辑"
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></Button> */}

      <Button
        onClick={(e) => handleDel(e, record.id)}
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        label="删除"
      ></Button>
    </div>
  );

  const RenderLink = ({ record }) => {
    const { type, url } = record;

    console.log(11, type);
    switch (type) {
      case 1:
        return (
          <ImageField source="url" title="图片" label="图片" sortable={false} />
        );

      case 2:
        return <VideoField source="url" label="视频" sortable={false} />;

      case 4:
        return <AudioField source="url" label="音频" sortable={false} />;
      default:
        return (
          <UrlField
            source="url"
            label="链接"
            style={{ width: "200px", display: "block", overflow: "scroll" }}
            sortable={false}
            target="_blank"
          ></UrlField>
        );
    }
  };

  return (
    <>
      <List actions={<ListActions />} filters={postFilters}>
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" label="ID" sortable={false} />
          <SelectField
            source="type"
            choices={TypeList}
            label="物料类型"
            sortable={false}
          />
          <TextField source="note" label="备注" sortable={false} />
          <FunctionField
            label="链接"
            render={(record) => <RenderLink record={record} />}
          />
          {/* <UrlField
            source="link"
            label="跳转地址"
            style={{ width: "200px", display: "block", overflow: "scroll" }}
            sortable={false}
            target="_blank"
          ></UrlField> */}
          <DateField
            source="createTime"
            label="创建时间"
            showTime
            sortable={false}
          ></DateField>
          {/* <DateField
            source="updatedAt"
            label="更新时间"
            showTime
            sortable={false}
          ></DateField> */}
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

export default MaterialList;
