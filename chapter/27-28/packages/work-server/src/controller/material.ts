import type { Context } from 'koa';
import * as service from '../service/material';
import { parseOnlineUserData } from './user';

export async function createMaterial(ctx: Context) {
  const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    name: string;
    version: string;
  };
  const { name, version } = params;
  const result = await service.createMaterial(
    {
      name,
      currentVersion: version,
      info: '{}', // TODO
      extend: '{}' // TODO
    },
    {
      uuid: userData.uuid
    }
  );
  ctx.body = result;
}

export async function updateMaterial(ctx: Context) {
  const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    uuid: string;
    name: string;
    currentVersion: string;
    info: string;
    extend: string;
  };
  const { uuid, name, currentVersion, info, extend } = params;
  const result = await service.updateMaterial(
    {
      uuid,
      name,
      currentVersion,
      info,
      extend
    },
    {
      uuid: userData.uuid
    }
  );
  ctx.body = result;
}

export async function getMaterialData(ctx: Context) {
  let uuid = '';
  if (typeof ctx.query?.uuid === 'string') {
    uuid = ctx.query?.uuid;
  }
  ctx.body = await service.getMaterialInfo({ uuid });
}

export async function getMaterialList(ctx: Context) {
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

  ctx.body = await service.getMaterialList({ pageSize: size, pageNum: start });
}

export async function checkMaterialExist(ctx: Context) {
  const { name = '', currentVersion = '' } = ctx.query as {
    name?: string;
    currentVersion?: string;
  };
  const result = await service.checkMaterial({ name, currentVersion });
  ctx.body = result;
}
