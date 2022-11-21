import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router';
import { createApp } from 'vue';
import App from './app.vue';

// 不同路由的页面视图
import HomeView from './views/home.vue';
import ListView from './views/list.vue';
import DetailView from './views/detail.vue';
import DetailItemView from './views/detail-item.vue';
import AboutView from './views/about.vue';

// 定义路由
// const router = createRouter({
//   linkActiveClass: 'active',
//   // hash 路由配置
//   // history: createWebHashHistory('/'),

//   // history 路由配置
//   history: createWebHistory('/'),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/list',
//       name: 'list',
//       component: ListView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: AboutView
//     },
//     {
//       path: '/detail/:id',
//       component: DetailView,
//       children: [{ path: '', component: DetailItemView }]
//     }
//   ]
// });

const router = createRouter({
  linkActiveClass: 'active',
  // hash 路由配置
  // history: createWebHashHistory('/'),

  // history 路由配置
  history: createWebHistory('/'),
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
