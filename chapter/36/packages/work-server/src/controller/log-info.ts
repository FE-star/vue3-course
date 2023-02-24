import type { Context } from 'koa';
import * as service from '../service/log-info';
import type { LogType } from '../types';
// import { parseOnlineUserData } from './user';

export async function cleanLog(ctx: Context) {
  // const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    type: LogType;
  };
  const { type } = params;
  const result = await service.cleanLogInfos({ type });
  ctx.body = result;
}

export async function getLogList(ctx: Context) {
  const { pageSize, pageNum } = ctx.query as {
    pageNum?: string;
    pageSize?: string;
  };
  let start: number = parseInt(pageNum || '');
  let size: number = parseInt(pageSize || '');
  if (!(start > 0)) {
    start = 1;
  }
  if (!(size > 0)) {
    size = 5;
  }

  ctx.body = await service.getLogInfoList({ pageSize: size, pageNum: start });
}

export async function getPageTrackLog(ctx: Context) {
  const { pagePath, nearTimestamp } = ctx.query as unknown as {
    pagePath: string;
    nearTimestamp: number;
  };
  ctx.body = await service.getPageTrackLog({ pagePath, nearTimestamp });
}
