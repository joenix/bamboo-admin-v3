import {
  SimpleForm,
  SelectInput,
  TextInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  NumberInput,
  ImageInput,
  ImageField,
} from "../../utils/dep";

import { TypeList, GenderList } from "./config";

export default function FormCore() {
  return (
    <>
      <div className="viewContainer">
        <div className="title required">师资类型:</div>
        <SelectInput
          source="type"
          choices={TypeList}
          label={false}
          validate={[required("请选择师资类型")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">姓名:</div>
        <TextInput
          source="name"
          label={false}
          validate={[required("请输入姓名")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">性别:</div>
        <TextInput
          source="gender"
          label={false}
          validate={[required("请选择性别")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">年龄:</div>
        <TextInput
          source="age"
          label={false}
          validate={[required("请输入年龄")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">个人介绍:</div>
        <TextInput
          source="content"
          label={false}
          validate={[required("请输入个人介绍")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">省:</div>
        <TextInput
          source="province"
          label={false}
          validate={[required("请输入省")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">市:</div>
        <TextInput
          source="city"
          label={false}
          validate={[required("请输入市")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">区:</div>
        <TextInput
          source="area"
          label={false}
          validate={[required("请输入区")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">头像:</div>
        <ImageInput
          source="avatar"
          placeholder="上传头像"
          label={false}
          validate={[required("请上传头像")]}
        >
          <ImageField source="src" title="头像"></ImageField>
        </ImageInput>
      </div>
    </>
  );
}
