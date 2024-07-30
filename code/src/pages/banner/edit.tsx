import { useEffect } from "react";

import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useRecordContext,
  Edit,
} from "../../utils/dep";

const BannerEdit = () => {
  return (
    <Edit title="编辑轮播">
      <SimpleForm>编辑一下看看</SimpleForm>
    </Edit>
  );
};

export default BannerEdit;
