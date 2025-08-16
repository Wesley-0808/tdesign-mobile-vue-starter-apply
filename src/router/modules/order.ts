import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/order',
    name: 'order',
    component: Layout,
    children: [
      {
        path: 'confirm',
        name: '购买确认',
        component: () => import('@/pages/order/confirm/index.vue'),
      },
    ],
  },
];
