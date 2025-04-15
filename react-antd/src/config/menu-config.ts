import type { MenuDataItem } from "@ant-design/pro-components";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  BookOutlined,
  KeyOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export const asideMenuConfig: MenuDataItem[] = [
  {
    name: "概览",
    path: "/dashboard",
    icon: "DashboardOutlined",
  },
  {
    name: "物料管理",
    path: "/material",
    icon: "AppstoreOutlined",
  },
  {
    name: "资讯管理",
    path: "/information",
    icon: "FileTextOutlined",
  },
  {
    name: "师资管理",
    path: "/teacher",
    icon: "TeamOutlined",
  },
  {
    name: "机构管理",
    path: "/organization",
    icon: "ShopOutlined",
  },
  {
    name: "用户管理",
    path: "/user",
    icon: "UserOutlined",
  },
  {
    name: "图书管理",
    path: "/book",
    icon: "BookOutlined",
  },
  {
    name: "激活码管理",
    path: "/activation-code",
    icon: "KeyOutlined",
  },
  {
    name: "礼品管理",
    path: "/gift",
    icon: "GiftOutlined",
  },
  {
    name: "礼品兑换管理",
    path: "/gift-exchange",
    icon: "ShoppingCartOutlined",
  },
];

export const icons = {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  BookOutlined,
  KeyOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
};
