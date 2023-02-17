import type { Context, Next } from 'koa';
import { writePortalFrontLog } from '@my/mock-logger';

export const pushFrontLog = async (ctx: Context, next: Next) => {
  const logData = ctx.request.body as Record<string, any>;
  writePortalFrontLog(logData);
  ctx.body = { success: true, message: '', data: null };
  await next();
};
