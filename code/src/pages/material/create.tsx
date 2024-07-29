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
  useRecordContext,
  useInput,
} from "../../utils/dep";

import { Richtext } from "../../components";
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

  const Aside = () => <div>我是侧边栏，还没想好写什么</div>;

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

  return (
    <Create
      aside={<Aside />}
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
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="标题" />
        <TextInput source="description" multiline={true} label="描述" />
        <SelectInput source="category" label="学校" choices={choices} />
        {/* <FileInput
          source="attachments"
          label="文件上传"
          multiple={true}
          accept="application/pdf,application/msword,image/*,video/*,audio/*"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <ImageInput source="image" label="图片上传" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>

        <FileInput source="video" label="视频上传" accept="video/*">
          <FileField source="src" title="title" />
        </FileInput> */}
        <FileInput
          source="audio"
          label="音频上传"
          // color="secondary"
          placeholder="拖动文件，或者点击进行上传"
        >
          <FileField source="src" title="title" />
        </FileInput>
        <Richtext onChange={(richtext) => setRichtext(richtext)} />
        <DateInput
          label="时间选择"
          source="published_at"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
};

export default MaterialCreate;
