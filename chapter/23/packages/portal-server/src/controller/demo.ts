import type { Context, Next } from 'koa';
// import { createSSRApp } from 'vue';
// import { renderToString } from 'vue/server-renderer';
// import type { Component } from 'vue';
import { getDemoHTML } from '../util/file';

export const renderDemo = async (ctx: Context, next: Next) => {
  const html = getDemoHTML(ctx.params.demoName);
  ctx.body = html;
  await next();
};
