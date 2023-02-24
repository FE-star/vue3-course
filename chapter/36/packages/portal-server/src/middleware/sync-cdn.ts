import path from 'node:path';
import type { Context, Next } from 'koa';
import { readFileFromCDN } from '@my/mock-cdn';
import { writePublicFile } from '../util/file';

const mimes: Record<string, string> = {
  css: 'text/css',
  less: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml'
};

export async function syncFileFromCDN(ctx: Context, next: Next) {
  await next();
  if (ctx.path.startsWith('/public/cdn/') && ctx.status === 404) {
    const cdnPath = ctx.path.replace('/public/cdn/', '');
    const text: string | null = await readFileFromCDN(cdnPath);
    if (typeof text === 'string') {
      writePublicFile(ctx.path.replace('/public', ''), text);
      const extname = path.extname(cdnPath);
      ctx.set('Content-Type', mimes[extname.replace(/^./, '')] || 'text/plain');
      ctx.status = 200;
      ctx.body = text;
    }
  }
}
