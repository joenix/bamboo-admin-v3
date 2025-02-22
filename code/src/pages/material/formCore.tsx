import {
  FileField,
  FileInput,
  ImageField,
  SelectInput,
  TextInput,
  required,
  FunctionField,
  useInput,
} from "@/utils/dep";
import { useState } from "react";
import { TypeList } from "./config";

export default function FormCore() {
  const [accept, setAccept] = useState<string[]>([]);
  const [type, setType] = useState(1);

  const { field } = useInput({ source: "attachments" });

  const handleTypeChange = (event) => {
    const selectedType = Number(event.target.value);
    setType(selectedType);
    let accept = "";

    switch (selectedType) {
      // 图片
      case 1:
        accept = ".jpg,.png,.svg,.webp,.gif";
        break;
      // 视频
      case 2:
        accept = ".mp4";
        break;
      // // 书
      // case 3:
      // // 附件
      // case 5:
      //   accept = "application/*";
      //   break;
      // 音乐
      case 4:
        accept = ".mp3,.m4a,.wav,.aac";
        break;
    }

    setAccept(accept.split(","));
    field.onChange(null);
  };

  const validateAccept = (value) => {
    if (!value) {
      return "请上传物料";
    }
    const name = value.rawFile.name;
    console.log(value, name, accept);
    if (accept.some((v) => name.indexOf(v) > -1)) {
      return undefined;
    }
    const typeName = TypeList.find((v) => v.id === type)?.name;
    return `${typeName}物料只支持${accept.join(",")}格式`;
  };

  return (
    <>
      <div className="viewContainer">
        <div className="title required">物料类型:</div>
        <SelectInput
          variant="outlined"
          source="type"
          choices={TypeList}
          label={false}
          validate={[required("请选择物料类型")]}
          onChange={handleTypeChange}
        />
      </div>
      <div className="viewContainer">
        <div className="title">备注:</div>
        <TextInput source="note" label={false} variant="outlined" multiline />
      </div>
      {/* <div className="viewContainer">
        <div className="title">内容:</div>
        <TextInput
          source="content"
          label="内容"
          validate={[required()]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title">跳转地址:</div>
        <TextInput source="link" label="跳转地址" variant="outlined" />
      </div> */}
      {/* <div className="viewContainer">
        <div className="title">链接:</div>
        <TextInput
          source="url"
          label="链接"
          variant="outlined"
          readOnly
          validate={[required()]}
        />
      </div> */}
      <div className="viewContainer">
        <div className="title required">上传物料:</div>
        <FileInput
          source="attachments"
          accept={{ accept }}
          label={false}
          placeholder="点击上传"
          validate={[required("请上传物料"), validateAccept]}
          className="material-file-input"
        >
          <FunctionField
            source="src"
            render={(record) =>
              type === 1 ? (
                <img src={record.src} />
              ) : type === 2 ? (
                <video controls src={record.src} />
              ) : (
                <audio controls src={record.src} />
              )
            }
          />
        </FileInput>
      </div>
    </>
  );
}
