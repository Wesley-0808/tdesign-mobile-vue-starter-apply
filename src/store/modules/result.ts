// result.ts
import { defineStore } from 'pinia';

import type { ActivityModel } from '@/api/model/listModel';
import type { UserInfo } from '@/types/interface';

export const useResultStore = defineStore('result', {
  state: () => ({
    activity: {} as ActivityModel,
    users: [] as UserInfo[],
    order: {},
  }),
  actions: {
    setActivity(activity: ActivityModel) {
      this.activity = activity;
    },
    setUsers(users: UserInfo[]) {
      this.users = users;
    },
    setOrder(order: any) {
      this.order = order;
    },
    addUser(user: UserInfo) {
      this.users.push(user);
    },
  },
  getters: {
    getActivity: (state) => state.activity,
    getUsers: (state) => state.users,
  },
});
