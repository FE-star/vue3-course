import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './app.vue';
import '@my/components/css/index.css';

const router = createRouter({
  linkActiveClass: 'active',
  // hash 路由配置
  // history: createWebHashHistory('/'),

  // history 路由配置
  history: createWebHistory('/page/manage'),
  routes: [
    {
      path: '/',
      redirect: '/material-list'
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
    // {
    //   path: '/material/:id',
    //   component: () => import('./views/material.vue'),
    //   children: [{ path: '', component: () => import('./views/material.vue') }]
    // },
    {
      path: '/page-list',
      name: 'page-list',
      component: () => import('./views/page-list.vue')
    },
    {
      path: '/page/:id',
      component: () => import('./views/page.vue'),
      children: [{ path: '', component: () => import('./views/page.vue') }]
    }
  ]
});

const app = createApp(App);
app.use(router);

app.mount('#app');
