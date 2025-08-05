import 'nprogress/nprogress.css'; // progress bar style

import NProgress from 'nprogress'; // progress bar
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

// 导入index相关固定路由
const indexModules = import.meta.glob('./modules/**/home.ts', { eager: true });

// 导入modules非index相关固定路由
const fixedModules = import.meta.glob('./modules/**/!(home).ts', { eager: true });

// 存放固定路由
export const homepageRouterList: Array<RouteRecordRaw> = mapModuleRouterList(indexModules);
export const fixedRouterList: Array<RouteRecordRaw> = mapModuleRouterList(fixedModules);

export const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404',
  },
];

export const allRoutes = [...homepageRouterList, ...fixedRouterList, ...defaultRouterList];

// 固定路由模块转换为路由
export function mapModuleRouterList(modules: Record<string, unknown>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = [];
  Object.keys(modules).forEach((key) => {
    // @ts-expect-error 外部赋值不太好直接写类型
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routerList.push(...modList);
  });
  return routerList;
}

export const getActive = (maxLevel = 3): string => {
  // 非组件内调用必须通过Router实例获取当前路由
  const route = router.currentRoute.value;

  if (!route.path) {
    return '';
  }

  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('');
};

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
