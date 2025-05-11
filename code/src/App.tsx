import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { BasicLayout } from "./layouts/BasicLayout";

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            siderBg: "#ffffff",
          },
          Menu: {
            itemSelectedBg: "#e6f7ff",
            itemSelectedColor: "#1677ff",
          },
        },
      }}
    >
      <BasicLayout />
    </ConfigProvider>
  );
}
