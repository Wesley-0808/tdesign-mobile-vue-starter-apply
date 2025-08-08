import { defineStore } from 'pinia';

import { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';
import type { RouterItem, TabbarItem } from '@/types/interface';

export const useRouterStore = defineStore('router', {
  state: () => ({
    routers: [] as RouterItem[],
    tabbar: [] as TabbarItem[],
  }),
  getters: {
    tabbarList: (state) => {
      return state.tabbar;
    },
    tabbarPath: (state) => {
      return state.tabbar.map((item) => item.path);
    },
  },
  actions: {
    initRoutes() {
      this.routers = [...homepageRouterList, ...fixedRouterList];
      this.getTabbar();
    },
    getTabbar() {
      const res: TabbarItem[] = [];

      const buildPath = (parentPath: string, currentPath: string): string => {
        if (!currentPath) return parentPath;
        if (parentPath.endsWith('/')) {
          return `${parentPath}${currentPath}`;
        }
        return `${parentPath}/${currentPath}`;
      };

      const traverse = (routers: RouterItem[], parentPath = '') => {
        routers.forEach((router) => {
          // 构建路径
          const currentPath = router.path
            ? parentPath
              ? buildPath(parentPath, router.path)
              : router.path.startsWith('/')
                ? router.path
                : `/${router.path}`
            : parentPath;

          if (router?.meta?.tabbar) {
            res.push({
              ...router.meta.tabbar,
              path: currentPath,
            });
          }

          // 递归处理children
          if (router?.children) {
            traverse(router.children, currentPath);
          }
        });
      };

      traverse(this.routers);
      // 按照index排序
      this.tabbar = res.sort((a, b) => a.index - b.index);
    },
  },
});

export function getRouterStore() {
  return useRouterStore(store);
}
