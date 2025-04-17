// API 路径配置
export const apiConfig = {
  // 文件上传
  File: {
    upload: "https://api.lhdd.club/public/upload",
  },
  // 用户
  User: {
    registry: "/admin/users/regist",
    getall: "/admin/users/get_all",
    login: "/admin/users/login",
    update: "/admin/users/update",
    delete: "/admin/users/remove",
  },
  // 通用物料
  Material: {
    upload: "/admin/material/upload",
    getall: "/admin/material/get_all",
    getDetail: "/admin/material/get_one",
    download: "/admin/material/download",
    create: "/admin/material/create",
    update: "/admin/material/update",
    delete: "/admin/material/remove",
  },
  // 权限
  Permission: {
    create: "/admin/permission/create",
    update: "/admin/permission/update",
    getall: "/admin/permission/get_all",
  },
  // 角色
  Role: {
    create: "/admin/role/create",
    update: "/admin/role/update",
    getall: "/admin/role/get_all",
  },
  // 咨询
  Information: {
    create: "/admin/information/create",
    update: "/admin/information/update",
    getall: "/admin/information/get_all",
    delete: "/admin/information/remove",
  },
  // 图书
  Book: {
    create: "/admin/book/create",
    update: "/admin/book/update",
    getall: "/admin/book/get_all",
    delete: "/admin/book/remove",
  },
  // 导航
  Banner: {
    create: "/admin/banner/create",
    update: "/admin/banner/update",
    getall: "/admin/banner/get_all",
  },
  // 着陆页
  Landing: {
    create: "/admin/landing/create",
    update: "/admin/landing/update",
    getall: "/admin/landing/get_all",
  },
  // 师资
  Teach: {
    create: "/admin/teach/create",
    update: "/admin/teach/update",
    getall: "/admin/teach/get_all",
    delete: "/admin/teach/remove",
  },
  // 机构
  School: {
    create: "/admin/school/create",
    update: "/admin/school/update",
    getall: "/admin/school/get_all",
    delete: "/admin/school/remove",
  },
  // 激活码
  Code: {
    create: "/admin/code/create",
    update: "/admin/code/update",
    getall: "/admin/code/get_all",
    delete: "/admin/code/remove",
  },
  Gift: {
    create: "/admin/gift/create",
    updata: "/admin/gift/update",
    getall: "/admin/gift/get_all",
    delete: "/admin/gift/remove",
  },
  GiftExchange: {
    create: "/admin/gift_exchange/create",
    update: "/admin/gift_exchange/update",
    getall: "/admin/gift_exchange/get_all",
  },
};
