// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
} from "react-admin";
// import RichTextInput from "ra-input-rich-text";

export const BannerEdit = () => (
  <Create>
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

export default BannerEdit;
