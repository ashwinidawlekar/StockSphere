import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
    SettingOutlined,
    UserOutlined,
    AppstoreOutlined,
    QuestionCircleOutlined,
    StockOutlined
} from '@ant-design/icons'

const { SubMenu } = Menu

const Navbar: React.FC = () => {
    return (
        <Menu
            mode="horizontal"
            theme="dark"
            style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
            <SubMenu key="autotrader" icon={<AppstoreOutlined />} title="AutoTrader">
                <Menu.Item key="activity">
                    <Link to="/autotrader/activity">Activity</Link>
                </Menu.Item>
                <Menu.Item key="instruments">
                    <Link to="/autotrader/instruments">Instruments</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="trading" icon={<StockOutlined />} title="Trading">
                <Menu.Item key="portfolio">
                    <Link to="/trading/portfolio">Portfolio</Link>
                </Menu.Item>
                
            </SubMenu>
            <SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
                <Menu.Item key="general">
                    <Link to="/settings/general">General</Link>
                </Menu.Item>
                <Menu.Item key="general">
                    <Link to="/settings/general">Trading Accounts</Link>
                </Menu.Item>
                <Menu.Item key="general">
                    <Link to="/settings/general">Psudo Accounts</Link>
                </Menu.Item>
                <Menu.Item key="general">
                    <Link to="/settings/general">Group Accounts</Link>
                </Menu.Item>
                <Menu.Item key="general">
                    <Link to="/settings/general">Master Accounts</Link>
                </Menu.Item>
                <Menu.Item key="general">
                    <Link to="/settings/general">Security</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
                <Link to="/help">Help</Link>
            </Menu.Item>
            <SubMenu key="user" icon={<UserOutlined />} title="User">
                <Menu.Item key="user">
                    <Link to="/user/account">Account</Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to="/user/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Link to="/user/logout">Logout</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default Navbar
