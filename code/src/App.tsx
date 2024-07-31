// Use Dep
import {
  Admin,
  Resource,
  localStorageStore,
  CustomRoutes,
  Route,
} from "./utils/dep";

// Use Kit
import { queryClient, fetchResources } from "./utils/kit";

// Use Icon
import MenuBook from "@mui/icons-Material/MenuBook";
import ViewCarousel from "@mui/icons-Material/ViewCarousel";
import SupportAgent from "@mui/icons-Material/SupportAgent";
import Inventory from "@mui/icons-Material/Inventory";
import Teachs from "@mui/icons-Material/School";
import Schools from "@mui/icons-Material/Business";
import TipsAndUpdates from "@mui/icons-Material/TipsAndUpdates";
import People from "@mui/icons-Material/People";
import Person from "@mui/icons-Material/Person";
import VpnKey from "@mui/icons-Material/VpnKey";

// Use Layout
import { Layout } from "./Layout";

// Use Provider
import { dataProvider, authProvider } from "./provider";

import "./index.less";

// Use Pages
import {
  Banner,
  Material,
  Book,
  Teach,
  School,
  Code,
  Tips,
  Information,
  Role,
  User,
} from "./pages";

// Use Components
import {
  NotFount,
  DashBoard,
  MyError,
  Setting,
  Profile,
  Login,
  Ready,
} from "./components";

export const App = () => {
  return (
    <Admin
      // 强制校验路由权限
      requireAuth
      // 允许匿名访问，跳过验证
      // disableAuthentication
      layout={Layout}
      // 业务接口
      dataProvider={dataProvider}
      // 登陆接口
      authProvider={authProvider}
      // 自定义404
      // catchAll={NotFount}
      dashboard={DashBoard}
      // 自定义error
      error={MyError}
      // error title
      title="My Custom Admin"
      // 使用localStorage缓存数据
      store={localStorageStore()}
      // 自定义登陆页面
      // loginPage={Login}
      // 接口配置
      queryClient={queryClient}
      // 自定义ready页面
      // ready={Ready}
    >
      {/* 动态Resource */}
      {/* {fetchResources} */}

      {/* 标准路由 */}

      {/* Material */}
      <Resource
        name="Material"
        list={Material.List}
        edit={Material.Edit}
        show={Material.Show}
        create={Material.Create}
        // 图标
        icon={Inventory}
        // 自定义菜单标题
        options={{ label: "物料管理" }}
      ></Resource>

      {/* Banner */}
      <Resource
        name="Banner"
        list={Banner.List}
        edit={Banner.Edit}
        show={Banner.Show}
        create={Banner.Create}
        // 图标
        icon={ViewCarousel}
        // 自定义菜单标题
        options={{ label: "轮播管理" }}
      >
        {/* <Route path=":bannerId/detail" element={<div>detail</div>} /> */}
      </Resource>

      {/* Information */}
      <Resource
        name="Information"
        list={Information.List}
        edit={Information.Edit}
        show={Information.Show}
        create={Information.Create}
        // 图标
        icon={SupportAgent}
        // 自定义菜单标题
        options={{ label: "咨询管理" }}
      ></Resource>

      {/* Book */}
      <Resource
        name="Book"
        list={Book.List}
        edit={Book.Edit}
        show={Book.Show}
        create={Book.Create}
        // 图标
        icon={MenuBook}
        // 自定义菜单标题
        options={{ label: "图书管理" }}
      ></Resource>

      {/* Teach */}
      <Resource
        name="Teach"
        list={Teach.List}
        edit={Teach.Edit}
        show={Teach.Show}
        create={Teach.Create}
        // 图标
        icon={Teachs}
        // 自定义菜单标题
        options={{ label: "师资管理" }}
      ></Resource>

      {/* School */}
      <Resource
        name="School"
        list={School.List}
        edit={School.Edit}
        show={School.Show}
        create={School.Create}
        // 图标
        icon={Schools}
        // 自定义菜单标题
        options={{ label: "机构管理" }}
      ></Resource>

      {/* Tips */}
      <Resource
        name="Tips"
        list={Tips.List}
        edit={Tips.Edit}
        show={Tips.Show}
        create={Tips.Create}
        // 图标
        icon={TipsAndUpdates}
        // 自定义菜单标题
        options={{ label: "贴士集管理" }}
      ></Resource>

      {/* Role */}
      <Resource
        name="Role"
        list={Role.List}
        edit={Role.Edit}
        show={Role.Show}
        create={Role.Create}
        // 图标
        icon={People}
        // 自定义菜单标题
        options={{ label: "角色管理" }}
      ></Resource>

      {/* User */}
      <Resource
        name="User"
        list={User.List}
        edit={User.Edit}
        show={User.Show}
        create={User.Create}
        // 图标
        icon={Person}
        // 自定义菜单标题
        options={{ label: "用户管理" }}
      ></Resource>

      {/* Code */}
      <Resource
        name="Code"
        list={Code.List}
        edit={Code.Edit}
        show={Code.Show}
        create={Code.Create}
        // 图标
        icon={VpnKey}
        // 自定义菜单标题
        options={{ label: "激活码管理" }}
      ></Resource>

      {/* 自定义路由 - 不会显示在菜单上*/}
      <CustomRoutes>
        {/* 配置 */}
        <Route path="/setting" element={<Setting />} />
        {/* 用户中心 */}
        <Route path="/profile" element={<Profile />} />
      </CustomRoutes>
    </Admin>
  );
};
