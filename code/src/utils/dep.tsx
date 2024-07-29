// Use ReactAdmin
export {
  /**
   *  Core
   *  ====== ====== ======
   */
  Admin,
  Resource,
  localStorageStore,
  CustomRoutes,
  useResourceContext,
  useRecordContext,
  usePermissions,
  useListContext,
  fetchUtils,
  useNotify,
  useRedirect,
  useInput,

  /**
   *  DataProvider
   *  ====== ====== ======
   */
  useGetList,
  useGetOne,
  useGetMany,
  useGetManyReference,
  useCreate,
  useUpdate,
  useUpdateMany,
  useDelete,
  useDeleteMany,

  /**
   *  AuthProvider
   *  ====== ====== ======
   */
  useLogin,
  useLogout,
  useCheckAuth,
  useGetPermissions,
  useGetIdentity,

  /**
   *  UI
   *  ====== ====== ======
   */
  Datagrid,
  List,
  FunctionField,
  Button,
  Layout,
  TopToolbar,
  CheckForApplicationUpdate,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  SelectColumnsButton,
  FilterButton,
  CreateButton,
  ExportButton,
  SearchInput,
  ShowButton,
  SelectInput,
  ImageInput,
  FileInput,
  SaveButton,
  UpdateButton,
  ListButton,
  PrevNextButtons,
  DeleteButton,
  EditButton,
  RefreshButton,
  Toolbar,
  TabbedForm,
  FormTab,

  /**
   *  Field
   *  ====== ====== ======
   */
  TextField,
  EmailField,
  ArrayField,
  SingleFieldList,
  BooleanField,
  ChipField,
  DateField,
  FileField,
  ImageField,
  NumberField,
  RichTextField,
  SelectField,
  UrlField,
  WrapperField,
} from "react-admin";

// Use QueryClient
export { QueryClient } from "@tanstack/react-query";

// Use Route
export {
  useParams,
  useLocation,
  Route,
  Link as RouterLink,
} from "react-router-dom";

// Use @mui/material
export { Breadcrumbs, Link, Typography } from "@mui/material";

// Use Icon
import PostIcon from "@mui/icons-material/Book";
