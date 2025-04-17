import { message } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.lhdd.club",
  // baseURL: "http://localhost:6033",
  timeout: 10000,
  headers: {
    Token: JSON.parse(localStorage.getItem("user") || "{}").token,
  },
});

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    // 如果响应成功，直接返回响应数据
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      console.log(response);
      if (response.status === 401) {
        // 处理未授权错误，跳转到登录页面
        message.error("登录已失效，请重新登录");
        localStorage.removeItem("user"); // 清除本地存储的用户信息
        window.location.href = "/login"; // 跳转到登录页面
      } else {
        // 处理其他错误
        message.error(response.data.message || "请求失败");
      }
    } else {
      message.error("网络错误，请稍后重试");
    }
    return Promise.reject(error);
  }
);

export default api;
