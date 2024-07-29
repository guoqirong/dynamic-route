import { history, Outlet } from 'umi';
import { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './index.less';

export default function Layouts() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout className='layout-wrapper'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '首页',
              onClick: () => {
                history.push('/');
              },
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '用户管理',
              children: [
                {
                  key: '2-1',
                  icon: <UploadOutlined />,
                  label: '用户列表',
                  onClick: () => {
                    history.push('/user');
                  },
                },
              ]
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '菜单列表',
              onClick: () => {
                history.push('/menu');
              },
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: '权限列表',
              onClick: () => {
                history.push('/rule');
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
