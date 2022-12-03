/* eslint-disable no-console */
// import { createSSRApp } from 'vue/dist/vue.cjs';

import Koa from 'koa';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import App from './vue-ssr-app';

// 初始化 Koa.js 应用
const servre = new Koa();

servre.use(async (ctx) => {
  // 封装 Koa.js 中间件
  // 渲染 Vue.js 组件或应用的HTML内容
  const app = createSSRApp(App, {});
  const html = await renderToString(app);
  ctx.body = html;
});

servre.listen(6001, () => {
  console.log('SSR 服务已经启动，浏览器打开 http://127.0.0.1:6001/');
});
