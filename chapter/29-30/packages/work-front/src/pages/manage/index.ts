import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './app.vue';
import '@my/components/css/index.css';
import '@my/business/css/index.css';

const router = createRouter({
  linkActiveClass: 'active',
  // hash 路由配置
  // history: createWebHashHistory('/'),

  // history 路由配置
  history: createWebHistory('/page/manage'),
  routes: [
    {
      path: '/',
      redirect: '/page-list'
    },
    {
      path: '/material-list',
      name: 'material-list',
      component: () => import('./views/material-list.vue')
    },
    {
      path: '/material-create',
      component: () => import('./views/material-create.vue')
    },
    {
      path: '/material-edit',
      component: () => import('./views/material-edit.vue')
    },
    {
      path: '/material-preview',
      component: () => import('./views/material-preview.vue')
    },
    {
      path: '/page-list',
      name: 'page-list',
      component: () => import('./views/page-list.vue')
    },
    {
      path: '/page',
      component: () => import('./views/page.vue')
    },
    {
      path: '/page-publish',
      component: () => import('./views/page-publish.vue')
    }
  ]
});

const app = createApp(App);
app.use(router);

app.mount('#app');
