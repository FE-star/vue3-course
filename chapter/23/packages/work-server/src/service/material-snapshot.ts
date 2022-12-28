import {
  findMaterialSnapshotDetailListByPage,
  countMaterialSnapshots
} from '../model/material-snapshot';
import type { MyAPIResult } from '../types';

export async function getMaterialSnapshotList(params: {
  pageNum?: number;
  pageSize?: number;
  materialUuid: string;
}): Promise<MyAPIResult> {
  // findMaterialSnapshotDetailListByPage
  const { pageNum = 1, pageSize = 5, materialUuid } = params;
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  try {
    const list = await findMaterialSnapshotDetailListByPage({
      pageNum,
      pageSize,
      materialUuid
    });

    const count = await countMaterialSnapshots({ materialUuid });
    result.data = {
      list,
      total: count?.total,
      pageSize: pageSize,
      pageNum: pageNum
    };
    result.success = true;
    result.message = '物料快照查询成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}
