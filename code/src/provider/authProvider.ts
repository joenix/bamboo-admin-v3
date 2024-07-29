import { AuthProvider, HttpError, redirectTo } from "react-admin";
// Use Api
import { api } from "../http";

// Use HttpClient
import { httpClient } from "../utils/kit";

// Use User Api
const { User } = api;

// AuthProvider
export const authProvider: AuthProvider = {
  // 登陆
  login: async ({ username, password }) => {
    // const res = await httpClient.post(User.login, {
    //   data: { username, password },
    // });

    // console.log("res", res);

    localStorage.setItem(
      "user",
      JSON.stringify({ name: "dingding", token: "12345" })
    );
    return Promise.resolve();

    return Promise.reject(
      new HttpError("用户名或密码错误", 401, {
        message: "Invalid username or password",
      })
    );
  },
  // 登出
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: (error) => {
    console.log("error", error);
    return Promise.resolve();
  },

  // 检查登陆态
  checkAuth: () => {
    return localStorage.getItem("user")
      ? Promise.resolve()
      : Promise.reject("用户未登录"!);
  },

  // 获取权限
  getPermissions: () => {
    return Promise.resolve("有没有权限呢?");
  },

  // 获取用户信息
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
