import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/order',
    name: 'order',
    component: Layout,
    children: [
      {
        path: 'confirm',
        name: 'OrderConfirm',
        component: () => import('@/pages/order/confirm/index.vue'),
      },
    ],
  },
];
