import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './app.vue';

const router = createRouter({
  linkActiveClass: 'active',
  // hash 路由配置
  // history: createWebHashHistory('/'),

  // history 路由配置
  history: createWebHistory('/page/manage'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/list.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('./views/detail.vue'),
      children: [
        { path: '', component: () => import('./views/detail-item.vue') }
      ]
    }
  ]
});

const app = createApp(App);
app.use(router);

app.mount('#app');
