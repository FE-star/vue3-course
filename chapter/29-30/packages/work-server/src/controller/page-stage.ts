import type { Context } from 'koa';
import * as service from '../service/page-stage';
import { parseOnlineUserData } from './user';

export async function publishPageStage(ctx: Context) {
  const userData = await parseOnlineUserData(ctx);
  const params = ctx.request.body as {
    uuid: string;
    stage: 'test' | 'pre' | 'prod';
  };
  const { uuid, stage } = params;
  const result = await service.pushPageStage({
    uuid,
    stage,
    userData: {
      uuid: userData.uuid
    }
  });
  ctx.body = result;
}
