// result.ts
import { defineStore } from 'pinia';

import type { ActivityModel } from '@/api/model/listModel';
import type { UserInfo } from '@/types/interface';

const defaultUsers = [
  {
    id: 1,
    name: '蔡宣轩',
    avatar: '/assets/image/avatar.png',
    birthday: '1996-01-01',
    phone: '12345678910',
    identityCard: 'ABCD',
    email: 'mail@example.com',
    occupation: 'art-practitioners',
  },
];

export const useResultStore = defineStore('result', {
  state: () => ({
    activity: {
      id: 2,
      img: '/assets/image/activity/cover-2.png',
      name: '2021 SICC服务设计创新大会',
      field: 'art',
      type: 'lecture',
      price: [
        {
          name: '早鸟价-单人票',
          price: 128,
          discount: 88,
        },
        {
          name: '早鸟价-双人票',
          price: 228,
          discount: 168,
        },
        {
          name: '正价-单人票',
          price: 128,
        },
        {
          name: '正价-双人票',
          price: 228,
        },
      ],
      evaluate: 4.5,
      interested: 236,
      date: ['2021-3-16'],
      place: '深圳市腾讯滨海大厦',
      introduce:
        '在数字化时代背景下，如何抓住机遇，构建“数字”+“文化”更高效、宽领域、深覆盖的新时代文化创新之路，让优秀传统文化得以延续和新生，被更多人认可和接受，也是我们服务设计探索的方向。2021年5月16日，由腾讯用户研究与体验设计部（简称CDC）主办的第三届服务创新大会，将在深圳腾讯滨海大厦召开。近年来数字化正在赋能传统文化的传承和传播，而传统文化也同样在启发新的服务设计理念和思路，两者之间的界限越来越模糊，相互融合。本次大会将围绕文化保育和文化创新，邀请7位传统文物、建筑、服饰、工艺等不同艺术领域的行业专家，为我们分享最新发展趋势和实践经验，开拓来宾在传统文化与数字科技间的碰撞思路，探索新的服务设计课题，让我们先睹为快，了解这些专家们将会分享哪些主题。 ',
      guest: [
        {
          name: '1',
          img: '/assets/image/activity/guest-1.png',
        },
        {
          name: '2',
          img: '/assets/image/activity/guest-2.png',
        },
      ],
      venue: [
        {
          name: '1',
          img: '/assets/image/activity/venue-1.png',
        },
        {
          name: '2',
          img: '/assets/image/activity/venue-2.png',
        },
      ],
    } as ActivityModel,
    users: [...defaultUsers] as UserInfo[],
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
