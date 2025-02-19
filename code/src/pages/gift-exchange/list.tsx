import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  Button,
  ImageField,
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
  NumberField,
  useResourceContext,
} from "../../utils/dep";

// Use Components
import { Confirmdialog } from "../../components";

// Use Icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GiftExchangeList = () => {
  const [dialogvisible, setDialogvisible] = useState(false);
  const [curId, setCurId] = useState(null);

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

  // 搜索
  const postFilters = [
    <SearchInput placeholder="请搜索" source="id" alwaysOn />,
    <TextInput label="姓名" source="name" defaultValue="" />,
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

  const CustomActions = ({ record }) => {
    return (
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
  };

  return (
    <>
      <List actions={<ListActions />} filters={postFilters}>
        <Datagrid bulkActionButtons={false}>
          <NumberField source="id" label="id" sortable={false} />
          <NumberField source="giftId" label="礼品ID" sortable={false} />
          <TextField source="giftName" label="礼品名称" sortable={false} />
          <TextField source="name" label="收货人" sortable={false} />
          <TextField source="phone" label="收货人手机号" sortable={false} />
          <TextField source="address" label="收货地址" sortable={false} />
          {/* <FunctionField
            label="操作"
            render={(record) => <CustomActions record={record} />}
          /> */}
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

export default GiftExchangeList;
