import { create } from "domain";
import { get } from "http";

// Host
export const host = "https://api.lhdd.club";

// Api
export const api = {
  // 用户
  User: {
    registry: "/users/regist",
    getall: "/users/get_all",
    login: "/users/login",
    update: "/users/update",
  },
  // 通用物料
  Material: {
    upload: "/material/upload",
    getall: "/material/get_all",
    download: "/material/download",
    create: "/material/create",
    update: "/material/update",
  },
  // 权限
  Permission: {
    create: "/permission/create",
    update: "/permission/update",
    getall: "/permission/get_all",
  },
  // 角色
  Role: {
    create: "/role/create",
    update: "/role/update",
    getall: "/role/get_all",
  },
  // 咨询
  Information: {
    create: "/infomation/create",
    update: "/infomation/update",
    getall: "/infomation/get_all",
    delete: "/infomation/remove",
  },
  // 图书
  Book: {
    create: "/book/create",
    update: "/book/update",
    getall: "/book/get_all",
    delete: "/book/remove",
  },
  // 导航
  Banner: {
    create: "/banner/create",
    update: "/banner/update",
    getall: "/banner/get_all",
  },
  // 着陆页
  Landing: {
    create: "/landing/create",
    update: "/landing/update",
    getall: "/landing/get_all",
  },
  // 师资
  Teach: {
    create: "/teach/create",
    update: "/teach/update",
    getall: "/teach/get_all",
    delete: "/teach/remove",
  },
  // 机构
  School: {
    create: "/school/create",
    update: "/school/update",
    getall: "/school/get_all",
    delete: "/school/remove",
  },
  // 激活码
  Code: {
    create: "/code/create",
    update: "/code/update",
    getall: "/code/get_all",
    delete: "/code/remove",
  },
  Gift: {
    create: "/gift/create",
    updata: "/gift/update",
    getall: "/gift/get_all",
    delete: "/gift/remove",
  },
  GiftExchange: {
    create: "/gift_exchange/create",
    update: "/gift_exchange/update",
    getall: "/gift_exchange/get_all",
  },
};
