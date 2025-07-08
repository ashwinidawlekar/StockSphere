import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import StatCard from '../../../Components/StatsCards.tsx';
import SummaryTable from './SummaryTable.tsx';
import PositionAnalyticsSummary from './PositionAnalyticsSummary.tsx';
// import { Icon } from '@iconify/react';

const { Title, Text } = Typography;
const Summary = () => {
    return (<div>
        <SummaryTable />
        <PositionAnalyticsSummary />
    </div>)
}
export default Summary
