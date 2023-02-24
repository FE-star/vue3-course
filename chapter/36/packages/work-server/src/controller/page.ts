import type { Context, Next } from 'koa';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import type { Component } from 'vue';
import { getPageSSRData } from '@my/work-front/dist/ssr/index.js';
import { getPageHTML, getPreviewHTML } from '../util/file';
import { getPageInfo } from '../service/page-info';
import { getPageInfo as getPageInfoTest } from '../service/page-info-test';
import { getPageInfo as getPageInfoPre } from '../service/page-info-pre';

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

export const renderPreview = async (ctx: Context, next: Next) => {
  const pageResultData = await getPageInfo({ uuid: ctx.params.pageUuid });
  const html = getPreviewHTML('预览-生产页面', {
    pageUuid: ctx.params.pageUuid,
    version: ctx.params.version,
    type: ctx.params.type,
    pageResultData,
    stage: 'prod'
  });
  ctx.body = html;
  await next();
};

export const renderPreviewTest = async (ctx: Context, next: Next) => {
  const pageResultData = await getPageInfoTest({ uuid: ctx.params.pageUuid });
  const html = getPreviewHTML('预览-测试页面', {
    pageUuid: ctx.params.pageUuid,
    version: ctx.params.version,
    type: ctx.params.type,
    pageResultData,
    stage: 'test'
  });
  ctx.body = html;
  await next();
};

export const renderPreviewPre = async (ctx: Context, next: Next) => {
  const pageResultData = await getPageInfoPre({ uuid: ctx.params.pageUuid });
  const html = getPreviewHTML('预览-预发页面', {
    pageUuid: ctx.params.pageUuid,
    version: ctx.params.version,
    type: ctx.params.type,
    pageResultData,
    stage: 'pre'
  });
  ctx.body = html;
  await next();
};
