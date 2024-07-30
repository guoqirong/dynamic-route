import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, ReactNode, Suspense, useEffect, useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import './App.css';

// 路由渲染
const renderRoutes = (routers: any[]): ReactNode => routers.map((route: any, index: number) => {
  const { component, routes, redirect } = route;
  if (redirect) {
    // 重定向
    return <Route key={route?.path + index} path={route?.path} element={<Navigate to={redirect} replace />} />;
  }

  if (component) {
    // 动态获取组件
    const Component = lazy(() => import('./pages' + component));
    // 有路由菜单
    return (
      <Route
        key={route?.path + index}
        path={route?.path}
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Component />
          </Suspense>
        }
      />
    );
  }
  // 无路由菜单
  return routes ? renderRoutes(routes) : null;
});

function App() {
  const { Header, Sider, Content } = Layout;
  const history = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [routers, setRouters] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);

  // 菜单格式化
  const loopMenuItem = (menus: any): any[] => {
    const menusData = menus.filter((item: any) => !item?.meta?.hidden);
    return menusData?.map(({ icon, routes, ...item }: any, index: number) => ({
      ...item,
      key: item.path + index,
      label: item?.meta?.title ?? item.path,
      onClick: routes ? undefined : () => history(item.path),
      children: routes && loopMenuItem(routes),
    }));
  };

  // 路由获取
  const getRouters = () => {
    fetch('/routes.json')
    .then((res) => res.json())
    .then((res) => {
      const homeRouter = { "path": "/", "component": "/", "meta": { "title": "首页" } };
      const rots = [homeRouter, ...res]
      setRouters(rots);
      setMenu(loopMenuItem(rots));
    });
  };

  useEffect(() => {
    getRouters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className='layout-wrapper'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menu}
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
          <Routes>
            {renderRoutes(routers)}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
