import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Title } from "react-admin";

const Dashboard = () => (
  <Card
    style={{
      height: "80%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Title title="六合竹简" />
    <CardContent
      style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
    >
      欢迎使用六合竹简-后台管理系统！
    </CardContent>
  </Card>
);

export default Dashboard;
