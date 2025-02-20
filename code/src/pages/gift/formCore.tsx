import {
  TextInput,
  required,
  NumberInput,
  ImageInput,
  ImageField,
} from "@/utils/dep";

export default function FormCore() {
  return (
    <>
      <div className="viewContainer">
        <div className="title required">礼品名称:</div>
        <TextInput
          source="name"
          label={false}
          validate={[required("请输入礼品名称")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title required">所需积分:</div>
        <NumberInput
          source="credit"
          label={false}
          validate={[required("请输入所需积分")]}
          variant="outlined"
          min={1}
        />
      </div>
      <div className="viewContainer">
        <div className="title required">礼品图片:</div>
        <ImageInput
          source="image"
          placeholder="点击上传"
          label={false}
          validate={[required("请上传礼品图片")]}
        >
          <ImageField source="src" title="礼品"></ImageField>
        </ImageInput>
      </div>
    </>
  );
}
