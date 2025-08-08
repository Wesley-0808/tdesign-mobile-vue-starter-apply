import { isFinite } from 'lodash';
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
      default: null,
    } as UsersInfo,
  }),
  getters: {
    defaultUser: (state) =>
      state.userInfo.default && state.userInfo.list.find((item) => item.id === state.userInfo.default)?.id,
  },
  actions: {
    addUser(info: UserInfo, setToDefault = false) {
      const id = this.getCurrentMaxUserId() + 1;
      this.userInfo.list.push({ ...info, id });
      if (setToDefault) {
        this.userInfo.default = id;
      }
    },

    getCurrentMaxUserId() {
      const ids = this.userInfo.list.map((item) => item.id);
      const maxId = Math.max(...ids);
      return isFinite(maxId) ? maxId : 0;
    },
  },
});

export function getUsersStore() {
  return useUsersStore(store);
}
