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
} from "../../utils/dep";

// Use Components
import { Confirmdialog } from "../../components";

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
    console.log(111);
    // 1. 走删除单个接口
    await dataProvider.delete(resource, { id: curId });
    console.log(222);
    // 2. 关闭弹窗
    dialogclose();

    // 3. 刷新页面
    await dataProvider.getList(resource);
    console.log(333);
  };

  const CustomActions = ({ record }) => (
    <div className="buttonGroup">
      <Button
        component={RouterLink}
        color="primary"
        variant="contained"
        startIcon={<EditIcon />}
        to={`/${resource}/${record.id}`}
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
          <TextField source="id" label="id" sortable={false} />
          <TextField source="name" label="名字" sortable={false} />
          <TextField source="content" label="内容" sortable={false} />
          <SelectField
            source="type"
            choices={TypeList}
            label="物料类型"
            sortable={false}
          />
          <UrlField
            source="url"
            label="链接"
            style={{ width: "200px", display: "block", overflow: "scroll" }}
            sortable={false}
            target="block"
          ></UrlField>
          <UrlField
            source="link"
            label="跳转地址"
            style={{ width: "200px", display: "block", overflow: "scroll" }}
            sortable={false}
            target="block"
          ></UrlField>
          <DateField
            source="createdAt"
            label="创建时间"
            showTime
            sortable={false}
          ></DateField>
          <DateField
            source="updatedAt"
            label="更新时间"
            showTime
            sortable={false}
          ></DateField>
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
