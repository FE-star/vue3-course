import semver from 'semver';
import type { MyAPIResult } from '../types';
import * as pageModelTest from '../model/page-info-test';
import * as pageModelProd from '../model/page-info';
import type { PageInfo } from '../types';
import { changePageInfoStage } from './info-data';

export async function createPageInfo(
  params: Pick<
    PageInfo,
    'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '创建失败'
  };
  try {
    // 注册生产环境数据，但是没有实际布局数据
    const prodResult = await pageModelProd.createPageInfo({
      ...params,
      ...{
        currentVersion: '',
        layout: '{}',
        info: JSON.stringify({ stage: 'ready' })
      }
    });
    if (prodResult) {
      // 准备测试环境数据
      await pageModelTest.createPageInfo({
        ...params,
        ...{ uuid: prodResult.uuid }
      });
    }
    result.data = prodResult;
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
    params.info = changePageInfoStage('ready', params.info);

    const { uuid, name, layout, info, extend, currentVersion } = params;
    const prodResult = await pageModelProd.findPageInfoByUuid({ uuid });
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
    const updateResult = await pageModelTest.updatePageInfo({
      uuid,
      name,
      layout,
      info,
      extend,
      currentVersion
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
