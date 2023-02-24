import semver from 'semver';
import type { MyAPIResult, PageInfo } from '../types';
import { findPageShapshotByUuidAndVersion } from '../model/page-snapshot';
import { tranformModelData } from '../util/db';
import { findPageInfoByUuid } from '../model/page-info';
import { updatePageInfo } from './page-info-ready';
import { changePageInfoRevertVersion } from './info-data';

export async function revertPageToSnapshot(params: {
  uuid: string;
  snapshotVersion: string;
}): Promise<MyAPIResult> {
  let result: MyAPIResult = {
    data: null,
    success: false,
    message: '回滚失败'
  };
  const { uuid, snapshotVersion } = params;
  const prodPageInfo = await findPageInfoByUuid({ uuid });
  let newVersion = semver.inc(snapshotVersion, 'patch') || snapshotVersion;
  if (prodPageInfo) {
    newVersion = semver.inc(prodPageInfo.currentVersion, 'patch') || newVersion;
  }
  const pageSnapshot = await findPageShapshotByUuidAndVersion({
    uuid,
    version: snapshotVersion
  });
  if (!pageSnapshot) {
    result.message = '查不到快照信息';
    return result;
  }

  try {
    const pageData = JSON.parse(pageSnapshot.pageData);
    const pageInfo: PageInfo = tranformModelData<PageInfo>(pageData);
    pageInfo.info = changePageInfoRevertVersion(snapshotVersion, pageInfo.info);
    pageInfo.currentVersion = newVersion;
    const { uuid, name, currentVersion, layout, info, extend } = pageInfo;
    const readyResult = await updatePageInfo({
      uuid,
      name,
      currentVersion,
      layout,
      info,
      extend
    });
    if (readyResult.success === true) {
      result.message = '已准备恢复数据';
      result.success = true;
    } else {
      result = readyResult;
    }
  } catch (err) {
    result.message = '处理快照信息异常';
    // eslint-disable-next-line no-console
    console.warn(err);
  }
  return result;
}
