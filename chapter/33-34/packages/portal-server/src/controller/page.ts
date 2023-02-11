import type { Context, Next } from 'koa';
// import { createSSRApp } from 'vue';
// import { renderToString } from 'vue/server-renderer';
// import type { Component } from 'vue';
import { getPageHTML, getProdPageHTML } from '../util/file';
import { getProdPageContents } from '../service/page';
import type { PageHtmlContent } from '../types';

export const renderCommonPage = async (ctx: Context, next: Next) => {
  const ssrHtml = ''; // TODO
  const ssrCss = ''; // TODO
  const html = getPageHTML(ctx.params.pageName, { ssrHtml, ssrCss });
  ctx.body = html;
  await next();
};

export const renderProdPage = async (ctx: Context, next: Next) => {
  const { uuid } = ctx.params;
  const { runModule } = ctx.query as { runModule?: string };
  const content: PageHtmlContent = await getProdPageContents({
    uuid,
    runModule
  });
  const html = getProdPageHTML(content);
  ctx.body = html;
  await next();
};
