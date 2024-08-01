import {
  SimpleForm,
  TextField,
  SelectInput,
  TextInput,
  BooleanInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  NumberInput,
} from "../../utils/dep";

// Use Components
import { ImgSelect, FileSelect } from "../../components";

const BookCreate = () => {
  const View = () => {
    // 请求物料-图片库
    const ImgList = [
      {
        id: 1,
        name: "风景",
        url: "https://img0.baidu.com/it/u=100080021,1406455647&fm=253&fmt=auto&app=120&f=JPEG?w=756&h=500",
      },
      {
        id: 2,
        name: "写实",
        url: "https://img2.baidu.com/it/u=2597929176,3520921866&fm=253&fmt=auto&app=120&f=JPEG?w=745&h=500",
      },
      {
        id: 3,
        name: "人物",
        url: "https://img2.baidu.com/it/u=640472597,1171972354&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
      },
    ];

    // 请求物料 - 书库
    const BookList = [
      {
        id: 1,
        name: "孟子",
        url: "http://www.mengzi.com",
      },
      {
        id: 2,
        name: "孔子",
        url: "http://www.kongzi.com",
      },
    ];

    return (
      <>
        <div className="viewContainer">
          <div className="title">书名:</div>
          <TextInput
            source="name"
            label="名称"
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">内容:</div>
          <TextInput
            source="content"
            label="内容"
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">书:</div>
          <FileSelect source="url" choices={BookList} label="选择书" />
        </div>
        <div className="viewContainer">
          <div className="title">图片:</div>
          <ImgSelect source="img" choices={ImgList} label="选择图片" />
        </div>
      </>
    );
  };
  // 自定义工具栏
  const CustomToolbar = (props) => {
    return (
      <Toolbar {...props} className="buttonGroup">
        <SaveButton label="保存" />
      </Toolbar>
    );
  };

  return (
    <Create title="新建图书">
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Create>
  );
};

export default BookCreate;
