/* eslint-disable no-console */
/* eslint-disable no-undef */
const Koa = require('Koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
const port = 9001;

router.get('/001', async (ctx) => {
  ctx.body = '<div>普通页面结果</div>';
});

router.get('/002', async (ctx) => {
  let count = 0;
  for (let i = 0; i < 9999999999; i++) {
    count++;
  }
  ctx.body = `<div>CPU密集计算数据 - 共[${count}]次计算</div>`;
});

app.use(router.routes());

app.listen(port, () => {
  console.log('服务已启动');
  console.log(`访问普通请求 http://127.0.0.1:${port}/001`);
  console.log(`访问CPU密集计算请求 http://127.0.0.1:${port}/002`);
});
