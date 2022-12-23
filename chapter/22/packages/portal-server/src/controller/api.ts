import type { Context, Next } from 'koa';

export const getData = async (ctx: Context, next: Next) => {
  const data = [
    { id: 'A001', name: '001' },
    { id: 'A002', name: '002' },
    { id: 'A003', name: '003' },
    { id: 'A004', name: '004' },
    { id: 'A005', name: '005' }
  ];
  ctx.body = data;
  await next();
};
