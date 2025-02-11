import { lazy } from "react";

let normalizedRoutes: any;

// umi4.x 需要将 routes 选项从第一个参数中解构: patchClientRoutes({ routes }) {}
export function patchClientRoutes({ routes }: any) {
  if (normalizedRoutes) {
    const routerIndex = routes.findIndex((item: any) => item.path === '/');
    const data = mergeRoutes(normalizedRoutes, routes[routerIndex]['routes']);
    routes[routerIndex]['routes'].push(
      ...data
    );
  }
}

// oldRender 至少需要被调用一次
export function render(oldRender: () => void) {
  fetch('/routes.json')
    .then((res) => res.json())
    .then((res) => {
      normalizedRoutes = res;
      oldRender();
    });
}

// 获取动态路由组件
const mergeRoutes = (routes: any[], parentRoute: { path: any }) => {
  if (!Array.isArray(routes)) return [];
  return routes.map((route) => {
    // 地址拼接
    if (route.path) {
      route.path = route.path.startsWith('/')
        ? route.path
        : `${parentRoute?.path || ''}/${route.path}`;
    }
    // 页面组件获取
    if (route.component) {
      const Component = ((component) => {
        if (typeof component === 'function') {
          return component;
        }
        route.exact = true;
        return lazy(() => import('./pages/' +
          component.substr(component.indexOf('/') + 1)));
        // return require('./pages/' +
        //   component.substr(component.indexOf('/') + 1)).default;
      })(route.component);
      route.element = <Component />;
    }
    route.exact = true;
    if (route.routes) {
      route.children = mergeRoutes(route.routes, route);
    }
    return route;
  });
};
