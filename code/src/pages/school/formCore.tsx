import {
  SelectInput,
  required,
  TextInput,
  ImageInput,
  ImageField,
} from "@/utils/dep";
import { TypeList } from "./config";
export default function FormCore() {
  return (
    <>
      <div className="viewContainer">
        <div className="title required">机构类型:</div>
        <SelectInput
          source="type"
          choices={TypeList}
          label={false}
          validate={[required("请选择机构类型")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">机构名:</div>
        <TextInput
          source="name"
          label={false}
          validate={[required("请输入机构名")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">机构介绍:</div>
        <TextInput
          source="content"
          label={false}
          validate={[required("请输入机构介绍")]}
          variant="outlined"
          multiline
        />
      </div>
      {/* <div className="viewContainer">
        <div className="title">学校性质:</div>
        <TextInput
          source="nature"
          label="学校性质"
          validate={[required("请输入市")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title">学校类别:</div>
        <TextInput
          source="school_type"
          label="学校类别"
          validate={[required("请输入市")]}
          variant="outlined"
        />
      </div> */}
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
        <div className="title required">机构图片:</div>
        <ImageInput
          source="img"
          placeholder="点击上传"
          label={false}
          validate={[required("请上传机构图片")]}
        >
          <ImageField source="src" title="机构图片"></ImageField>
        </ImageInput>
      </div>
    </>
  );
}
