import semver from 'semver';
import type { MyAPIResult } from '../types';
import * as pageModel from '../model/page-info';
import * as pageModelPre from '../model/page-info-pre';
import type { PageInfo } from '../types';
import { pushFullPageStage } from './page-static';
import { changePageInfoStage } from './info-data';

export async function createPageInfo(
  params: Pick<
    PageInfo,
    'uuid' | 'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '创建失败'
  };
  try {
    params.info = changePageInfoStage('pre', params.info);
    const { currentVersion } = params;
    const createResult = await pageModelPre.createPageInfo(params);
    // 推送页面到预发布环境
    await pushFullPageStage({
      uuid: createResult?.uuid || '',
      version: currentVersion,
      stage: 'pre'
    });
    result.data = createResult;
    result.success = true;
    result.message = '页面创建成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}

export async function updatePageInfo(
  params: Pick<
    PageInfo,
    'uuid' | 'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '更新失败'
  };
  try {
    const { uuid, name, layout, info, extend, currentVersion } = params;
    const prodResult = await pageModel.findPageInfoByUuid({ uuid });
    const existPage = await pageModelPre.findPageInfoByUuid({ uuid });

    if (existPage === null) {
      result.message = '当前页面不存在';
      return result;
    }

    if (prodResult && semver.valid(prodResult?.currentVersion)) {
      // 如果线上存在版本，就证明已经发布过了
      // 接下来就要做版本校验
      if (
        semver.lt(currentVersion, prodResult.currentVersion) ||
        currentVersion === prodResult.currentVersion
      ) {
        result.message = `"${name}"版本必须大于${prodResult.currentVersion}`;
        return result;
      }
    }

    const updateResult = await pageModelPre.updatePageInfo({
      uuid,
      name,
      layout,
      info,
      extend,
      currentVersion
    });

    // 推送页面到预发布环境
    await pushFullPageStage({
      uuid: uuid || '',
      version: currentVersion,
      stage: 'pre'
    });
    result.data = updateResult;
    result.success = true;
    result.message = '页面更新成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}

export async function getPageInfo(params: {
  uuid: string;
}): Promise<MyAPIResult> {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  const data = await pageModelPre.findPageInfoByUuid(params);
  if (data !== null) {
    delete data.id;
    result.data = data;
    result.success = true;
    result.message = '查询数据成功';
  }
  return result;
}

export async function getPageList(params: {
  pageNum?: number;
  pageSize?: number;
}) {
  const { pageNum = 1, pageSize = 5 } = params;
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  try {
    const list = await pageModelPre.findPageListByPage({
      pageNum,
      pageSize
    });
    const countResult = await pageModelPre.countPages();
    result.data = { list, total: countResult?.total, pageSize, pageNum };
    result.success = true;
    result.message = '页面查询成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}
