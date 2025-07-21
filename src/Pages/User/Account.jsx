import React from 'react';
import { Card, Row, Col, Tabs, Typography } from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Account = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Tabs defaultActiveKey="plan" type="card">
        <TabPane tab="📋 Plan" key="plan">
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', background: '#00b8b8', color: 'white', padding: '10px 0', borderRadius: 5 }}>
              Billing Plan
            </Title>

            {/* 🔴 Current Plan */}
            <Card
              title="📌 Current Plan"
              headStyle={{ backgroundColor: '#e0f0ff' }}
              style={{ marginBottom: 24 }}
            >
              <Row>
                <Col span={12}><Text strong>Plan</Text></Col>
                <Col span={12}><Text style={{ color: 'purple' }}>REGULAR</Text></Col>
              </Row>
              <Row>
                <Col span={12}><Text strong>Monthly Price</Text></Col>
                <Col span={12}>495/-</Col>
              </Row>
              <Row>
                <Col span={12}><Text strong>Discount</Text></Col>
                <Col span={12}>0/-</Col>
              </Row>
            </Card>

            {/* 🟡 Next Plan */}
            <Card
              title="🚀 Next Plan Upgrade"
              headStyle={{ backgroundColor: '#fff9db' }}
              style={{ marginBottom: 24 }}
            >
              <Row>
                <Col span={12}><Text strong>Plan</Text></Col>
                <Col span={12}><Text type="danger">PREMIUM</Text></Col>
              </Row>
              <Row>
                <Col span={12}><Text strong>Monthly Price</Text></Col>
                <Col span={12}>445/-</Col>
              </Row>
              <Row>
                <Col span={12}><Text strong>Discount</Text></Col>
                <Col span={12}>50/-</Col>
              </Row>
              <Row>
                <Col span={12}><Text strong>Applicable after</Text></Col>
                <Col span={12}>25,000/-</Col>
              </Row>
            </Card>

            {/* 🟢 Lifetime Bill */}
            <div style={{ backgroundColor: '#00b894', color: 'white', padding: 16, textAlign: 'center', borderRadius: 4 }}>
              <Text strong>Total Lifetime Bill: 0/-</Text>
            </div>
          </div>
        </TabPane>

        {/* Placeholder for other tabs (optional) */}
        <TabPane tab="💰 Balance" key="balance">Coming Soon...</TabPane>
        <TabPane tab="₹ Payment" key="payment">Coming Soon...</TabPane>
        <TabPane tab="📑 Ledger" key="ledger">Coming Soon...</TabPane>
        <TabPane tab="🧾 License" key="license">Coming Soon...</TabPane>
        <TabPane tab="📈 History" key="history">Coming Soon...</TabPane>
      </Tabs>
    </div>
  );
};

export default Account;
