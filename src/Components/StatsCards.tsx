import React from 'react';
import { Card, Typography } from 'antd';
// import { Icon } from '@iconify/react'; // or use any AntD icon

const { Title, Text } = Typography;

interface StatCardProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
    return (
        <Card
            bordered={false}
            style={{
                borderRadius: 12,
                background: color || 'linear-gradient(to right, #00dbde, #fc00ff)',
                color: 'white',
                minHeight: 100,
            }}
            bodyStyle={{ padding: 16 }}
        >
            <Text style={{ color: 'white', fontWeight: 500 }}>{label}</Text>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <Title level={3} style={{ margin: 0, color: 'white' }}>
                    ₹{value}
                </Title>
                <div style={{ marginLeft: 'auto' }}>{icon}</div>
            </div>
        </Card>
    );
};

export default StatCard;
