import {
  Show,
  SimpleShowLayout,
  useRecordContext,
  TextField,
  UrlField,
  BooleanField,
  ImageField,
  SelectField,
  TopToolbar,
  EditButton,
} from "../../utils/dep";

// Use Components
import { VideoField } from "../../components";

const CodeShow = () => {
  const ShowActions = () => {
    return (
      <TopToolbar>
        <EditButton label="编辑" />
      </TopToolbar>
    );
  };

  const View = () => {
    const record = useRecordContext();

    if (!record) return null;

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

    return (
      <>
        <div className="viewContainer">
          <div className="title">ID:</div>
          <TextField source="id" label="ID" />
        </div>
        {/* <div className="viewContainer">
          <div className="title">书id:</div>
          <TextField source="bookId" label="bookid" />
        </div> */}
        <div className="viewContainer">
          <div className="title">图书名称:</div>
          <TextField source="bookName" label="BookList" />
        </div>
        <div className="viewContainer">
          <div className="title">发放数量:</div>
          <TextField source="count" label="发放数量" />
        </div>
      </>
    );
  };

  return (
    <Show actions={<ShowActions />} title="激活码详情">
      <SimpleShowLayout>
        <View />
      </SimpleShowLayout>
    </Show>
  );
};

export default CodeShow;
