import { Datagrid, EmailField, List, TextField } from "../../utils/dep";

const MaterialList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
    </Datagrid>
  </List>
);

export default MaterialList;
