import { ImageField, ImageInput, TextInput, required } from "@/utils/dep";

export default function FormCore() {
  return (
    <>
      <div className="viewContainer">
        <div className="title">图书名称:</div>
        <TextInput
          source="name"
          label={false}
          variant="outlined"
          validate={[required("请输入图书名称")]}
        />
      </div>
      <div className="viewContainer">
        <div className="title">图书链接:</div>
        <TextInput
          source="url"
          label={false}
          variant="outlined"
          validate={[required("请输入图书链接")]}
        />
      </div>
      <div className="viewContainer">
        <div className="title">图书封面:</div>
        <ImageInput
          source="image"
          label={false}
          validate={[required("请上传图片")]}
          placeholder="上传图片"
        >
          <ImageField source="src" />
        </ImageInput>
      </div>
    </>
  );
}
