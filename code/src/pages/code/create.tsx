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

const CodeCreate = () => {
  const View = () => {
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
          <div className="title">书:</div>
          <FileSelect source="bookid" choices={BookList} label="选择书" />
        </div>
        <div className="viewContainer">
          <div className="title">发放数量:</div>
          <TextInput
            source="count"
            label="发放数量"
            validate={[required()]}
            variant="outlined"
          />
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
    <Create title="新建激活码">
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Create>
  );
};

export default CodeCreate;
