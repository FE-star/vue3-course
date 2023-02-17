import type { Context } from 'koa';
import { revertPageToSnapshot } from '../service/page-revert';

export async function revertPage(ctx: Context) {
  const params = ctx.request.body as {
    uuid: string;
    snapshotVersion: string;
  };
  const { uuid, snapshotVersion } = params;
  const result = await revertPageToSnapshot({
    uuid,
    snapshotVersion
  });
  ctx.body = result;
}
