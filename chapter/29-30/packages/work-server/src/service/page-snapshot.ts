import {
  findPageSnapshotDetailListByPage,
  countPageSnapshots
} from '../model/page-snapshot';
import type { MyAPIResult } from '../types';

export async function getPageSnapshotList(params: {
  pageNum?: number;
  pageSize?: number;
  pageUuid: string;
}): Promise<MyAPIResult> {
  // findPageSnapshotDetailListByPage
  const { pageNum = 1, pageSize = 5, pageUuid } = params;
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  try {
    const list = await findPageSnapshotDetailListByPage({
      pageNum,
      pageSize,
      pageUuid
    });

    const count = await countPageSnapshots({ pageUuid });
    result.data = {
      list,
      total: count?.total,
      pageSize: pageSize,
      pageNum: pageNum
    };
    result.success = true;
    result.message = '页面快照查询成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}
