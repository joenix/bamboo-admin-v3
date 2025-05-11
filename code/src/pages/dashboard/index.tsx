import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, BookOutlined, GiftOutlined, TeamOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import { useEffect, useState } from 'react';
import api from '@/api';
import { apiConfig } from '@/api/config';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  useEffect(() => {
    api
      .post(apiConfig.User.getall + '?page=1&pageSize=1', {
        filters: [],
      })
      .then(res => {
        if (res.data.status === 200) {
          setUserCount(res.data.msg.counts);
        }
      });
    api
      .post(apiConfig.Book.getall + '?page=1&pageSize=1', {
        filters: [],
      })
      .then(res => {
        if (res.data.status === 200) {
          setBookCount(res.data.msg.counts);
        }
      });
  }, []);
  return (
    <PageContainer>
      <div className="space-y-6">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Statistic title="用户总数" value={userCount} prefix={<UserOutlined />} valueStyle={{ color: '#1677ff' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="书籍总数" value={bookCount} prefix={<BookOutlined />} valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
