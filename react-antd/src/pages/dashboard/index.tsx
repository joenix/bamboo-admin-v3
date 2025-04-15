import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  BookOutlined,
  GiftOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import PageContainer from "@/components/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Statistic
                title="用户总数"
                value={1128}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1677ff" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="书籍总数"
                value={56}
                prefix={<BookOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="礼品总数"
                value={24}
                prefix={<GiftOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="教师总数"
                value={32}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="最近活动">{/* 这里可以添加最近活动列表 */}</Card>
          </Col>
          <Col span={12}>
            <Card title="系统状态">{/* 这里可以添加系统状态信息 */}</Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
