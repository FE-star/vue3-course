import type { Context } from 'koa';
import * as service from '../service/material-snapshot';

export async function getMaterialSnapshotList(ctx: Context) {
  const { pageSize, pageNum, materialUuid } = ctx.query as {
    pageNum?: string;
    pageSize?: string;
    materialUuid: string;
  };
  let start: number = parseInt(pageNum || '');
  let size: number = parseInt(pageSize || '');
  if (!(start > 0)) {
    start = 1;
  }
  if (!(size > 0)) {
    size = 5;
  }

  ctx.body = await service.getMaterialSnapshotList({
    pageSize: size,
    pageNum: start,
    materialUuid: materialUuid || ''
  });
}
