import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ImageInput,
  FileInput,
  FileField,
  ImageField,
  required,
  useNotify,
  useRedirect,
  SaveButton,
  RefreshButton,
  Toolbar,
  TabbedForm,
  FormTab,
} from "../../utils/dep";

import { RichText } from "../../components";
import { useState } from "react";

/**
 * @returns
 * By default, submitting the form in the <Create> view redirects to the <Edit> view.
 */
export const MaterialCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [richtext, setRichtext] = useState("");

  // 自定义成功回调
  const onSuccess = (data) => {
    notify(`新建成功`);
    redirect(`/Material`);
  };

  // 自定义失败回调
  const onError = (error) => {
    notify(`新建失败: ${error.message}`);
  };

  // 数据处理： submit ->  transform -> dataProvider.create()
  const transform = (data) => {
    data = {
      ...data,
      richtext,
    };
    console.log(data);
    return data;
  };

  const choices = [
    { id: "choice1", name: "清华" },
    { id: "choice2", name: "北大" },
  ];

  const MyToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton label="新建" />
    </Toolbar>
  );

  return (
    <Create
      mutationOptions={{ meta: { foo: "bar" }, onSuccess, onError }}
      /**
       *  'edit': redirect to the Edit view (the default)
       *  'list': redirect to the List view
       *  'show': redirect to the Show view
       *  false: do not redirect
       *  A function (resource, id, data) => string to redirect to different targets depending on the record
       */
      // redirect="list"
      title="新建物料"
      transform={transform}
    >
      <TabbedForm toolbar={<MyToolbar />}>
        {/* 视频管理 */}
        <FormTab label="视频管理">
          <FileInput
            source="video"
            placeholder="拖动文件，或者点击进行上传"
            multiple
            label="视频上传"
            accept="video/*"
          >
            <FileField source="src" title="title" />
          </FileInput>
        </FormTab>
        {/* 图片管理 */}
        <FormTab label="图片管理">
          <ImageInput
            source="image"
            placeholder="拖动文件，或者点击进行上传"
            multiple
            label="图片上传"
            accept="image/*"
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
        {/* 文件管理 */}
        <FormTab label="文件管理">
          <FileInput
            source="attachments"
            label="文件上传"
            placeholder="拖动文件，或者点击进行上传"
            multiple
            accept="application/pdf,application/msword,image/*,video/*,audio/*"
          >
            <FileField source="src" title="title" />
          </FileInput>
        </FormTab>
        {/* 音频管理 */}
        <FormTab label="音频管理">
          <FileInput
            source="audio"
            label="音频上传"
            placeholder="拖动文件，或者点击进行上传"
            multiple
            accept={["audio/wav"]}
          >
            <FileField source="src" title="title" />
          </FileInput>
        </FormTab>

        {/* 富文本管理 */}
        <FormTab label="富文本管理">
          <RichText onChange={(r) => setRichtext(r)} />
        </FormTab>

        {/* 案件管理 */}
        <FormTab label="案件管理">
          <FileInput
            source="audio"
            label="案件上传"
            placeholder="拖动文件，或者点击进行上传"
            multiple
            // accept={["audio/wav"]}
          >
            <FileField source="src" title="title" />
          </FileInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default MaterialCreate;
