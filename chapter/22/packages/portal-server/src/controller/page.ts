import type { Context, Next } from 'koa';
// import { createSSRApp } from 'vue';
// import { renderToString } from 'vue/server-renderer';
// import type { Component } from 'vue';
import { getPageHTML } from '../util/file';

export const renderPage = async (ctx: Context, next: Next) => {
  const ssrHtml = ''; // TODO
  const ssrCss = ''; // TODO
  const html = getPageHTML(ctx.params.pageName, { ssrHtml, ssrCss });
  ctx.body = html;
  await next();
};
