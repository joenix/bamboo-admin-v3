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

const RoleCreate = () => {
  const View = () => {
    return (
      <>
        <div className="viewContainer">
          <div className="title">名称:</div>
          <TextInput
            source="name"
            label="名称"
            validate={[required()]}
            variant="outlined"
          />
        </div>
        <div className="viewContainer">
          <div className="title">描述:</div>
          <TextInput
            source="description"
            label="内容"
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
    <Create title="新建角色">
      <SimpleForm toolbar={<CustomToolbar />}>
        <View />
      </SimpleForm>
    </Create>
  );
};

export default RoleCreate;
