import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useNotify,
  useRedirect,
  useRecordContext,
} from "../../utils/dep";
// import RichTextInput from "ra-input-rich-text";

/**
 * BannerCreate
 * @returns
 * By default, submitting the form in the <Create> view redirects to the <Edit> view.
 */
export const BannerCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  // 自定义成功回调
  const onSuccess = (data) => {
    notify(`新建导航成功`);
    redirect(`/Banner`);
  };

  // 自定义失败回调
  const onError = (error) => {
    notify(`Could not create post: ${error.message}`);
  };

  const Aside = () => <div>Aside approves them</div>;

  // 数据处理： submit ->  transform -> dataProvider.create()
  const transform = (data) => {
    return {
      ...data,
      fullName: 123,
    };
  };

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
      title="新建轮播"
      transform={transform}
      // 自定义resource name，默认是外部<Resource>的name,在这是"Banner"
      resource="aaabbb"
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
        {/* <RichTextInput source="body" /> */}
        <DateInput
          label="Publication date"
          source="published_at"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
};

export default BannerCreate;
