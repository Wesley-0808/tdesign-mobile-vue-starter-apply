import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/mine',
    name: 'mine',
    component: Layout,
    redirect: '/mine/',
    children: [
      {
        path: '',
        name: 'MineIndex',
        component: () => import('@/pages/mine/index/index.vue'),
        meta: {
          title: { zh_CN: '我的', en_US: 'Mine' },
          showNav: true,
          navBgColor: 'transparent',
          navFgColor: '#000000e6',
        },
      },
      {
        path: 'info',
        name: 'MineInfo',
        component: () => import('@/pages/mine/info/index.vue'),
        meta: { title: { zh_CN: '个人信息', en_US: 'MineInfo' } },
      },
    ],
  },
];
