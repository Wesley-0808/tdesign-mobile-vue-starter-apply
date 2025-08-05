import { defineStore } from 'pinia';

import { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';

export const useRouterStore = defineStore('router', {
  state: () => ({
    routers: [],
  }),
  actions: {
    async initRoutes() {
      this.routers = [...homepageRouterList, ...fixedRouterList];
    },
  },
});

export function getRouterStore() {
  return useRouterStore(store);
}
