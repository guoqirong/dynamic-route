import { ComponentType, lazy, ReactNode, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd'
import { MenuItemType } from 'antd/es/menu/interface';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './App.css'

interface RouterItem {
  path: string;
  component?: string;
  redirect?: string;
  routes?: RouterItem[];
  meta?: {
    title?: string;
    hidden?: boolean;
  }
}

// 动态导入所有页面组件
const modules = import.meta.glob(['./pages/**/*.tsx', '!**/components/**']);

// 路由渲染
const renderRoutes = (routers: RouterItem[]): ReactNode => routers.map((route: RouterItem, index: number) => {
  const { component, routes, redirect } = route;
  if (redirect) {
    // 重定向
    return <Route key={route?.path + index} path={route?.path} element={<Navigate to={redirect} replace />} />;
  }

  if (component) {
    // 动态获取组件
    const keys = Object.keys(modules);
    const pathKey = keys.includes(`./pages${component}.tsx`) ? `./pages${component}.tsx` : `./pages${component}/index.tsx`
    const Component = lazy(async() => await modules[pathKey]() as Promise<{ default: ComponentType; }>);

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
  const [routers, setRouters] = useState<RouterItem[]>([]);
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  // 菜单格式化
  const loopMenuItem = (menus: RouterItem[]): MenuItemType[] => {
    const menusData = menus.filter((item: RouterItem) => !item?.meta?.hidden);
    return menusData?.map(({ routes, ...item }: RouterItem, index: number) => ({
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
      const homeRouter = { "path": "/", "component": "/index", "meta": { "title": "首页" } };
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

export default App

