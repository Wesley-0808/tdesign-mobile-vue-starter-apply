import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/activity',
    name: 'activity',
    component: Layout,
    children: [
      {
        path: ':id',
        name: 'activity-detail',
        component: () => import('@/pages/activity/index.vue'),
        meta: {
          navBgColor: '#000000',
          navFgColor: '#ffffff',
          title: { zh_CN: '详情', en_US: 'ActivityDetail' },
        },
      },
    ],
  },
];
