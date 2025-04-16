import { Layout, Menu, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { asideMenuConfig, icons } from "../config/menu-config";
import type { MenuProps } from "antd";
import React from "react";

const { Header, Sider, Content } = Layout;

const userMenuItems: MenuProps["items"] = [
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "退出登录",
  },
];

export function BasicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const menuItems: MenuProps["items"] = asideMenuConfig
    .filter((item) => item.path && item.name && item.icon)
    .map((item) => ({
      key: item.path!,
      icon: React.createElement(icons[item.icon as keyof typeof icons]),
      label: item.name!,
    }));
  const showName = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.username || "-";
  };
  return (
    <Layout className="h-screen">
      <Header className="flex items-center justify-between bg-white px-6 shadow-sm border-0 border-b border-gray-200 border-solid">
        <div className="text-xl font-bold text-gray-800">Bamboo Admin</div>
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
        >
          <div className="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">
            <Avatar icon={<UserOutlined />} className="bg-blue-500" />
            <span className="ml-2 text-gray-700">{showName()}</span>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider
          width={200}
          className=" border-0 border-solid border-r border-gray-200"
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
            onClick={handleMenuClick}
            className="pt-4"
          />
        </Sider>
        <Layout className="">
          <Content className="rounded-lg shadow-sm min-h-[calc(100vh-64px)]">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
