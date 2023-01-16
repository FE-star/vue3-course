/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

// middleware-demo.ts

const context = {};

async function middleware1(ctx: any, next: any) {
  console.log('打印 001');
  await next();
  console.log('打印 004');
}

async function middleware2(ctx: any, next: any) {
  console.log('处理HTTP响应之前');
  await next();
  console.log('处理HTTP响应之前');
}

async function middleware3(ctx: any, next: any) {
  console.log('打印 002');
  await next();
  console.log('打印 003');
}

Promise.resolve(
  middleware1(context, async () => {
    return Promise.resolve(
      middleware2(context, async () => {
        return Promise.resolve(
          middleware3(context, async () => {
            return Promise.resolve();
          })
        );
      })
    );
  })
).then(() => {
  console.log('执行结束');
});
