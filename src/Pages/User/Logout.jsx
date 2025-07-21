import React from 'react';
import { Layout, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white' }}>Logout</Header>
      <Content style={{ padding: '24px' }}>
        <Card title="Confirm Logout">
          <p>Are you sure you want to logout?</p>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default Logout;
