import type { Context } from 'koa';
import * as servicePageReady from '../service/page-info-ready';
// import { parseOnlineUserData } from './user';

export async function createReadyPageInfo(ctx: Context) {
  // const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    name: string;
    currentVersion: string;
    layout: string;
  };
  const { name, currentVersion, layout } = params;
  const result = await servicePageReady.createPageInfo(
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

export async function updateReadyPageInfo(ctx: Context) {
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
  const result = await servicePageReady.updatePageInfo(
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

export async function getReadyPageData(ctx: Context) {
  let uuid = '';
  if (typeof ctx.query?.uuid === 'string') {
    uuid = ctx.query?.uuid;
  }
  ctx.body = await servicePageReady.getPageInfo({ uuid });
}
