import { useEffect } from "react";

import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useRecordContext,
} from "../../utils/dep";

const BannerEdit = () => {
  const record = useRecordContext();

  // if (!record) return null;

  console.log("Record:", record); // 打印当前记录的数据
  return (
    <Create title="编辑轮播">
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput
          source="description"
          multiline={true}
          label="Short description"
        />
        <DateInput
          label="Publication date"
          source="published_at"
          defaultValue={new Date()}
        />
      </SimpleForm>
    </Create>
  );
};

export default BannerEdit;
