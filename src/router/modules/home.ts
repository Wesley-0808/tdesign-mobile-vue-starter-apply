import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/',
    name: 'home',
    children: [
      {
        path: '',
        name: 'HomeIndex',
        component: () => import('@/pages/home/index/index.vue'),
        meta: { title: { zh_CN: '首页', en_US: 'Index' } },
      },
      {
        path: 'region',
        name: 'ChooseRegion',
        component: () => import('@/pages/home/region/index.vue'),
        meta: { title: { zh_CN: '选择城市', en_US: 'ChooseRegion' } },
      },
    ],
  },
];
