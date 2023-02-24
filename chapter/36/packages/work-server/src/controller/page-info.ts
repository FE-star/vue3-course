import type { Context } from 'koa';
import * as service from '../service/page-info';
// import { parseOnlineUserData } from './user';

export async function createPageInfo(ctx: Context) {
  // const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    name: string;
    currentVersion: string;
    layout: string;
  };
  const { name, currentVersion, layout } = params;
  const result = await service.createPageInfo(
    {
      name,
      currentVersion,
      layout,
      info: '{}', // TODO
      extend: '{}' // TODO
    }
    // {
    //   uuid: userData.uuid
    // }
  );
  ctx.body = result;
}

export async function updatePageInfo(ctx: Context) {
  // const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    uuid: string;
    name: string;
    currentVersion: string;
    layout: string;
    info: string;
    extend: string;
  };
  const { uuid, name, currentVersion, layout, info, extend } = params;
  const result = await service.updatePageInfo(
    {
      uuid,
      name,
      currentVersion,
      layout,
      info,
      extend
    }
    // {
    //   uuid: userData.uuid
    // }
  );
  ctx.body = result;
}

export async function getPageData(ctx: Context) {
  let uuid = '';
  if (typeof ctx.query?.uuid === 'string') {
    uuid = ctx.query?.uuid;
  }
  ctx.body = await service.getPageInfo({ uuid });
}

export async function getPageList(ctx: Context) {
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

  ctx.body = await service.getPageList({ pageSize: size, pageNum: start });
}
