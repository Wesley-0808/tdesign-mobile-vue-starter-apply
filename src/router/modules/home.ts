import Layout from '@/layouts/index.vue';
import { t } from '@/locales';

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
        meta: {
          title: { zh_CN: '', en_US: '' },
          navBgColor: 'transparent',
          navFgColor: 'transparent',
          tabbar: {
            value: 'home',
            label: t('layout.tabbar.index'),
            icon: 'home',
            index: 0,
          },
        },
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
