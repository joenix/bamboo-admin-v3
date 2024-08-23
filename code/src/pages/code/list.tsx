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

const CodeList = () => {
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

  const dialogconfirm = () => {
    // 1. 走删除单个接口

    // 2. 关闭弹窗
    dialogclose();
  };

  // 请求物料-图书库
  const BookList = [
    {
      id: "111",
      name: "孔子",
      url: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
    },
    {
      id: "222",
      name: "孟子",
      url: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
    },
  ];

  const CustomActions = ({ record }) => (
    <div className="buttonGroup transparent">
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
          <TextField source="bookid" label="图书id" sortable={false} />
          <SelectField
            source="bookid"
            choices={BookList}
            label="书名"
            sortable={false}
          />
          <TextField source="count" label="发放数量" sortable={false} />
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

export default CodeList;
