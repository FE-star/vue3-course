/* eslint-disable no-console */
import Koa from 'koa';
import type { Context, Next } from 'koa';

const app = new Koa();

app.use(async (ctx: Context, next: Next) => {
  console.log(`[${ctx.path}] 打印 001`);
  await next();
  console.log(`[${ctx.path}] 打印 004`);
});

app.use(async (ctx: Context, next: Next) => {
  console.log(`[${ctx.path}] 处理HTTP响应之前`);
  ctx.body = `<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>当前页面链接: ${ctx.path}</h1>
  </body>
</html>`;
  await next();
  console.log(`[${ctx.path}] 处理HTTP响应之后`);
});

app.use(async (ctx: Context, next: Next) => {
  console.log(`[${ctx.path}] 打印 002`);
  await next();
  console.log(`[${ctx.path}] 打印 003`);
});

app.listen(6001, () => {
  console.log('Koa.js 服务已经启动，浏览器打开 http://127.0.0.1:6001/');
});
