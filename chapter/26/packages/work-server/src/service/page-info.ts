import semver from 'semver';
import type { MyAPIResult } from '../types';
import * as pageModel from '../model/page';
import * as snapshotModel from '../model/page-snapshot';
import type { PageInfo } from '../types';
import { buildFullPage } from './page-static';

export async function createPage(
  params: Pick<
    PageInfo,
    'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >,
  userData: { uuid: string }
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '创建失败'
  };
  try {
    params.info = JSON.stringify({ bundle: true, esm: true, amd: true });
    const { name, currentVersion, layout, info, extend } = params;
    const createResult = await pageModel.createPageInfo(params);
    // 创建快照
    await snapshotModel.createPageSnapshot({
      version: currentVersion,
      pageUuid: createResult?.uuid || '',
      pageData: JSON.stringify({ name, layout, info, extend }),
      userUuid: userData.uuid,
      extend: '{}'
    });
    // 构建编译整张页面
    await buildFullPage({
      uuid: createResult?.uuid || '',
      version: currentVersion,
      pageLayoutData: JSON.parse(layout)
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

export async function updatePage(
  params: Pick<
    PageInfo,
    'uuid' | 'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >,
  userData: { uuid: string }
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '更新失败'
  };
  try {
    params.info = JSON.stringify({ bundle: true, esm: true, amd: true });
    const { uuid, name, layout, info, extend, currentVersion } = params;
    const existPage = await pageModel.findPageInfoByUuid({ uuid });

    if (existPage === null) {
      result.message = '当前页面不存在';
      return result;
    }

    if (
      semver.lt(currentVersion, existPage.currentVersion) ||
      currentVersion === existPage.currentVersion
    ) {
      result.message = `${name}版本必须大于${existPage.currentVersion}`;
      return result;
    }

    const updateResult = await pageModel.updatePageInfo({
      uuid,
      name,
      layout,
      info,
      extend,
      currentVersion
    });
    // 创建快照
    await snapshotModel.createPageSnapshot({
      version: currentVersion,
      pageUuid: uuid || '',
      pageData: JSON.stringify({ name, layout, info, extend }),
      userUuid: userData.uuid,
      extend: '{}'
    });
    // 构建编译整张页面
    await buildFullPage({
      uuid: uuid || '',
      version: currentVersion,
      pageLayoutData: JSON.parse(layout)
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
  const data = await pageModel.findPageInfoByUuid(params);
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
    const list = await pageModel.findPageListByPage({
      pageNum,
      pageSize
    });
    const countResult = await pageModel.countPages();
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
