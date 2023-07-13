import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    ShoppingCartOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import {Link, Outlet, useNavigate} from "react-router-dom";
const { Header, Sider, Content } = Layout;


const Setting = () => {
    const navigate  = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/home']}>
                    <Menu.Item key="home" icon={<UserOutlined />}>
                        <Link to="/setting/categories">Categories</Link>
                    </Menu.Item>
                    <Menu.Item key="aricles" icon={<UserOutlined />}>
                        <Link to="/setting/articles">Articles</Link>
                    </Menu.Item>
                    <Menu.Item key="banners" icon={<UserOutlined />}>
                        <Link to="/setting/banners">Banners</Link>
                    </Menu.Item>
                    <Menu.Item key="commands" icon={<ShoppingCartOutlined />}>
                        <Link to="/setting/commands">Commands</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={<MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Setting;
