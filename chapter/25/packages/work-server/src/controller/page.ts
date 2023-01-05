import type { Context, Next } from 'koa';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import type { Component } from 'vue';
import { getPageSSRData } from '@my/work-front/dist/ssr/index.js';
import { getPageHTML } from '../util/file';

export const renderPage = async (ctx: Context, next: Next) => {
  const ssrPageData = await getPageSSRData(ctx.params.pageName);
  let ssrHtml = '';
  let ssrCss = '';
  if (ssrPageData?.Page) {
    const app = createSSRApp(ssrPageData?.Page as Component);
    ssrHtml = await renderToString(app);
    ssrCss = ssrPageData?.css || '';
  }
  const html = getPageHTML(ctx.params.pageName, { ssrHtml, ssrCss });
  ctx.body = html;
  await next();
};
