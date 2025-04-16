import { createBrowserRouter, Navigate } from "react-router-dom";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BasicLayout } from "@/layouts/BasicLayout";
import Dashboard from "@/pages/dashboard";
import Material from "@/pages/material";
import Information from "@/pages/information";
import Teacher from "@/pages/teacher";
import Organization from "@/pages/organization";
import User from "@/pages/user";
import Book from "@/pages/book";
import ActivationCode from "@/pages/activation-code";
import Gift from "@/pages/gift";
import GiftExchange from "@/pages/gift-exchange";
import Login from "@/pages/login";
// 404 页面组件
function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          返回首页
        </Button>
      }
    />
  );
}

// 路由守卫组件
function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("user") !== null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// 路由配置
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "material",
        element: <Material />,
      },
      {
        path: "information",
        element: <Information />,
      },
      {
        path: "teacher",
        element: <Teacher />,
      },
      {
        path: "organization",
        element: <Organization />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "book",
        element: <Book />,
      },
      {
        path: "activation-code",
        element: <ActivationCode />,
      },
      {
        path: "gift",
        element: <Gift />,
      },
      {
        path: "gift-exchange",
        element: <GiftExchange />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
