import {
  SimpleForm,
  TextField,
  SelectInput,
  TextInput,
  BooleanInput,
  Toolbar,
  SaveButton,
  Create,
  required,
  NumberInput,
  useFormContext,
  useNavigate,
} from "../../utils/dep";

import "./index.less";

import logo from "../../static/img/logo.jpg";
import { authProvider } from "../../provider/index";

const Login = () => {
  const navigate = useNavigate();

  // 自定义工具栏
  const CustomToolbar = (props) => {
    const { getValues } = useFormContext(); // 获取表单的值

    const loginIn = async () => {
      const { username, password } = getValues();

      if (username && password) {
        await authProvider.login(getValues());

        navigate("/");
      }
    };
    return (
      <Toolbar {...props} className="buttonGroup">
        <SaveButton label="登陆" onClick={loginIn} />
      </Toolbar>
    );
  };

  return (
    <div className="login-container">
      {/* logo */}
      <div className="logo-container">
        <img src={logo} className="logo" />
        <div className="title">六合竹简</div>
        <span className="splitter">|</span>
        <div className="title">统一技术治理平台</div>
      </div>
      {/* slogan */}
      <div className="slogan-container">
        <div className="slogan">
          <span>同心协力</span>
          <span>共创未来</span>
        </div>
        <div className="slogan_tips">让天下没有难教的孩子</div>
        <div className="slogan_tips">让天下没有难读的书</div>
      </div>
      {/* 表单 */}
      <div className="form-container">
        <SimpleForm toolbar={<CustomToolbar />}>
          <TextInput
            source="username"
            label="账号"
            validate={[required()]}
            variant="outlined"
            className="textInput"
          />
          <TextInput
            source="password"
            type="password"
            label="密码 "
            validate={[required()]}
            variant="outlined"
            className="textInput"
          />
        </SimpleForm>
        <div className="tips">宁波融道文化传播有限公司</div>
      </div>
    </div>
  );
};

export default Login;
