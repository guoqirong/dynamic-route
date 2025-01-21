// import { lazy } from "react";
import AsyncComponent from "./components/AsyncComponent";

let normalizedRoutes: any;

// umi3.x 需要将 routes 选项从第一个参数中解构: patchRoutes({ routes }) {}
export function patchRoutes({ routes }: any) {
  if (normalizedRoutes) {
    const pageRouters = routes[0]['routes'];
    const data = mergeRoutes(normalizedRoutes, pageRouters);
		pageRouters.push(...data);
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
    // 旧版3.x动态路由配置要用dynamic
    if (route.component) {
      route.component = ((component) => {
        if (typeof component === 'function') {
          return component;
        }
        route.exact = true;
        return AsyncComponent(component);
      })(route.component);
    }
    // 最新版3.x动态路由配置可以用lazy
    // if (route.component) {
    //   route.component = ((component) => {
    //     if (typeof component === 'function') {
    //       return component;
    //     }
    //     route.exact = true;
    //     return lazy(() => import('./pages/' +
    //       component.substr(component.indexOf('/') + 1)));
    //     // return require('./pages/' +
    //     //   component.substr(component.indexOf('/') + 1)).default;
    //   })(route.component);
    // }
    if (route.routes) {
      route.routes = mergeRoutes(route.routes, route);
    }
    return route;
  });
};
