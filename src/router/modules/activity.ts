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
      },
    ],
  },
];
