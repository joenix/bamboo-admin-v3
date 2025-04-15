import { ConfigProvider } from "antd";
import { BasicLayout } from "./layouts/BasicLayout";

export default function App() {
  return (
    <ConfigProvider
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
