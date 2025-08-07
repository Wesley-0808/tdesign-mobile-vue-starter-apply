import { defineStore } from 'pinia';

import { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';
import type { RouterItem, TabbarItem } from '@/types/interface';

export const useRouterStore = defineStore('router', {
  state: () => ({
    routers: [] as RouterItem[],
  }),
  getters: {
    tabbar: (state) => {
      const res: TabbarItem[] = [];
      state.routers.forEach((item) => {
        const traverse = (router: RouterItem, parentPath = '') => {
          if (router?.children) {
            router.children.forEach((child) => {
              traverse(child, `${parentPath}${router.path}/`);
            });
          } else if (router?.meta?.tabbar) {
            res.push({ ...router.meta.tabbar, path: `${parentPath}${router.path}` });
          }
        };
        traverse(item);
      });
      console.log(res);
      return res;
    },
  },
  actions: {
    async initRoutes() {
      this.routers = [...homepageRouterList, ...fixedRouterList];
    },
  },
});

export function getRouterStore() {
  return useRouterStore(store);
}
