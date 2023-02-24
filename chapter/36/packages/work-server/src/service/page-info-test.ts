import semver from 'semver';
import type { MyAPIResult } from '../types';
import * as pageModel from '../model/page-info';
import * as pageModelTest from '../model/page-info-test';
import type { PageInfo } from '../types';
import { buildFullPage } from './page-static';

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
    params.info = JSON.stringify({ bundle: true, esm: true, amd: true });
    const { currentVersion, layout } = params;
    const createResult = await pageModelTest.createPageInfo(params);
    // 构建编译整张页面
    await buildFullPage({
      uuid: createResult?.uuid || '',
      version: currentVersion,
      pageLayoutData: JSON.parse(layout),
      stage: 'test'
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
    // params.info = JSON.stringify({ bundle: true, esm: true, amd: true });
    const { uuid, name, layout, info, currentVersion } = params;
    const prodResult = await pageModel.findPageInfoByUuid({ uuid });
    const existPage = await pageModelTest.findPageInfoByUuid({ uuid });

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
    const updateResult = await pageModelTest.updatePageInfoData({
      uuid,
      info
    });
    // 构建编译整张页面
    await buildFullPage({
      uuid: uuid || '',
      version: currentVersion,
      pageLayoutData: JSON.parse(layout),
      stage: 'test'
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
  const data = await pageModelTest.findPageInfoByUuid(params);
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
    const list = await pageModelTest.findPageListByPage({
      pageNum,
      pageSize
    });
    const countResult = await pageModelTest.countPages();
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
