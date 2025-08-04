/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';

import App from './App.vue';
import router from './router';
import { getRouterStore, store } from './store';
import i18n from './locales';

import 'tdesign-mobile-vue/es/style/index.css';
import '@/style/index.less';

getRouterStore().initRoutes();

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(i18n);

app.mount('#app');
