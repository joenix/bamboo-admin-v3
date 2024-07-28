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
} from "../../utils/dep";
// import RichTextInput from "ra-input-rich-text";

/**
 * @returns
 * By default, submitting the form in the <Create> view redirects to the <Edit> view.
 */
export const UserCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  // 自定义成功回调
  const onSuccess = (data) => {
    notify(`新建成功`);
    redirect(`/User`);
  };

  // 自定义失败回调
  const onError = (error) => {
    notify(`Could not create post: ${error.message}`);
  };

  const Aside = () => <div>我是侧边栏，还没想好写什么</div>;

  // 数据处理： submit ->  transform -> dataProvider.create()
  const transform = (data) => {
    return {
      ...data,
      fullName: 123,
    };
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
      title="新建用户"
      transform={transform}
      // 自定义resource name，默认是外部<Resource>的name,在这是"User"
      // resource="aaabbb"
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="标题" />
        <TextInput source="description" multiline={true} label="描述" />
        <SelectInput source="category" label="学校" choices={choices} />

        <FileInput
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
        </FileInput>

        <FileInput source="audio" label="音频上传" accept="audio/*">
          <FileField source="src" title="title" />
        </FileInput>
        {/* <RichTextInput source="body" /> */}
        <DateInput
          label="时间选择"
          source="published_at"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
