import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  ClockCircleOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import "./AnalyticsCard.css";

const { Text } = Typography;

const AnalyticsCard = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="analytics-container">
      <Text className="analytics-title">Positions Analytics [NET]</Text>

      <Row gutter={[16, 16]} className="card-row">
        {/* M2M Card */}
        <Col xs={24} sm={12} md={8}>
          <Card className="gradient-card green-card">
            <div className="card-header">
              <Text className="card-label">M2M</Text>
              <RiseOutlined className="icon-rupee" />
            </div>
            <div className="card-amount">₹0.00</div>
          </Card>
        </Col>

        {/* PnL Card */}
        <Col xs={24} sm={12} md={8}>
          <Card className="gradient-card green-card">
            <div className="card-header">
              <Text className="card-label">PnL</Text>
              <FallOutlined className="icon-rupee" />
            </div>
            <div className="card-amount">₹0.00</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Total/Open/Closed Card */}
        <Col xs={24} sm={12} md={8}>
          <Card className="gradient-card blue-card">
            <div className="card-row-data">
              <div>
                <Text className="card-label">Total</Text>
                <div className="card-amount-small">0</div>
              </div>
              <div>
                <Text className="card-label">Open</Text>
                <div className="card-amount-small">0</div>
              </div>
              <div>
                <Text className="card-label">Closed</Text>
                <div className="card-amount-small">0</div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Update Time Box (not card) */}
        <Col xs={24} sm={12} md={8}>
          <div className="update-time-box">
            <ClockCircleOutlined className="update-icon" />
            <Text className="update-text">
              <span className="update-label">Update Time</span> {time}
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsCard;
