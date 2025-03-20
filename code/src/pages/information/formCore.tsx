import { TextInput, required } from "@/utils/dep";
import { RichTextInput } from "ra-input-rich-text";

export default function FormCore() {
  return (
    <>
      <div className="viewContainer">
        <div className="title required">资讯标题:</div>
        <TextInput
          source="name"
          label={false}
          variant="outlined"
          validate={[required("请输入标题")]}
        />
      </div>
      <div className="viewContainer">
        <div className="title required">资讯内容:</div>
        <RichTextInput
          source="content"
          label={false}
          validate={[required("请输入内容")]}
          className="imformation-rich-input"
        />
      </div>
    </>
  );
}
