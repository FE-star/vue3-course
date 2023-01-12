import type { Context } from 'koa';
import * as service from '../service/page-snapshot';

export async function getPageSnapshotList(ctx: Context) {
  const { pageSize, pageNum, pageUuid } = ctx.query as {
    pageNum?: string;
    pageSize?: string;
    pageUuid: string;
  };
  let start: number = parseInt(pageNum || '');
  let size: number = parseInt(pageSize || '');
  if (!(start > 0)) {
    start = 1;
  }
  if (!(size > 0)) {
    size = 5;
  }

  ctx.body = await service.getPageSnapshotList({
    pageSize: size,
    pageNum: start,
    pageUuid: pageUuid || ''
  });
}
