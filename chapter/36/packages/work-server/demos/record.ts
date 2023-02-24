/* eslint-disable no-console */
import type { Context, Next } from 'koa';

export async function record(ctx: Context, next: Next) {
  const info = `[${ctx.method}] ${ctx.url}`;
  // 进入内部中间件前的时间戳
  const start = Date.now();
  // 进入内部中间件前
  await next();
  // 跳出内部中间件后
  console.log(`${info} 内部所有中间件耗时 ${Date.now() - start}ms`);
  // 监听相应结束
  ctx.res.on('finish', () => {
    console.log(`${info} 请求完整耗时 ${Date.now() - start}ms`);
  });
}
