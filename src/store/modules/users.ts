import { defineStore } from 'pinia';

import { store } from '@/store';
import type { UserInfo } from '@/types/interface';

interface UsersInfo {
  list: UserInfo[];
  default: number;
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    userInfo: {
      list: [],
      default: 0,
    } as UsersInfo,
  }),
  getters: {
    defaultUser: (state) => state.userInfo.list.filter((item) => item.id === state.userInfo.default),
    getCurrentMaxUserId: (state) => Math.max(...state.userInfo.list.map((item) => item.id)),
  },
  actions: {
    addUser(info: UserInfo, setToDefault = false) {
      this.userInfo.list.push(info);
      if (setToDefault) {
        this.userInfo.default = info.id;
      }
    },
  },
});

export function getUsersStore() {
  return useUsersStore(store);
}
