import semver from 'semver';
import { readMaterialVersionsFromCDN } from '@my/mock-cdn';
import type { MyAPIResult } from '../types';
import * as materialModel from '../model/material';
import * as snapshotModel from '../model/material-snapshot';
import type { MaterialInfo } from '../types';

export async function createMaterial(
  params: Pick<MaterialInfo, 'name' | 'currentVersion' | 'info' | 'extend'>,
  userData: { uuid: string }
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '创建失败'
  };
  try {
    const { name, currentVersion } = params;
    const existMaterial = await materialModel.findMaterialByName({ name });

    if (existMaterial !== null) {
      result.message = '当前物料已经存在';
      return result;
    }
    const versions: string[] = readMaterialVersionsFromCDN({ name });

    if (!(Array.isArray(versions) && versions.length > 0)) {
      result.message = `CDN找不到物料${name}`;
      return result;
    }

    if (!versions.includes(currentVersion)) {
      result.message = `${name}版本${currentVersion}不存在CDN`;
      return result;
    }

    const createResult = await materialModel.createMaterial(params);
    // 创建快照
    await snapshotModel.createMaterialSnapshot({
      version: currentVersion,
      materialUuid: createResult?.uuid || '',
      userUuid: userData.uuid,
      extend: '{}'
    });
    result.data = createResult;
    result.success = true;
    result.message = '物料创建成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}

export async function updateMaterial(
  params: Pick<
    MaterialInfo,
    'uuid' | 'name' | 'currentVersion' | 'info' | 'extend'
  >,
  userData: { uuid: string }
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '更新失败'
  };
  try {
    const { uuid, name, info, extend, currentVersion } = params;
    const existMaterial = await materialModel.findMaterialByUuid({ uuid });

    if (existMaterial === null) {
      result.message = '当前物料不存在';
      return result;
    }
    const versions: string[] = readMaterialVersionsFromCDN({ name });

    if (!(Array.isArray(versions) && versions.length > 0)) {
      result.message = `CDN找不到物料${name}`;
      return result;
    }

    if (!versions.includes(currentVersion)) {
      result.message = `${name}版本${currentVersion}不存在CDN`;
      return result;
    }

    if (
      semver.lt(currentVersion, existMaterial.currentVersion) ||
      currentVersion === existMaterial.currentVersion
    ) {
      result.message = `${name}版本必须大于${existMaterial.currentVersion}`;
      return result;
    }

    const updateResult = await materialModel.updateMaterial({
      uuid,
      info,
      extend,
      currentVersion
    });
    // 创建快照
    await snapshotModel.createMaterialSnapshot({
      version: currentVersion,
      materialUuid: uuid || '',
      userUuid: userData.uuid,
      extend: '{}'
    });
    result.data = updateResult;
    result.success = true;
    result.message = '物料更新成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}

export async function getMaterialInfo(params: {
  uuid: string;
}): Promise<MyAPIResult> {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  const data = await materialModel.findMaterialByUuid(params);
  if (data !== null) {
    delete data.id;
    result.data = data;
    result.success = true;
    result.message = '查询数据成功';
  }
  return result;
}

export async function getMaterialList(params: {
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
    const list = await materialModel.findMaterialListByPage({
      pageNum,
      pageSize
    });
    const countResult = await materialModel.countMaterials();
    result.data = { list, total: countResult?.total, pageSize, pageNum };
    result.success = true;
    result.message = '物料查询成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}

export async function checkMaterial(
  params: Pick<MaterialInfo, 'name' | 'currentVersion'>
) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查找失败'
  };
  try {
    const { name, currentVersion } = params;
    const existMaterial = await materialModel.findMaterialByName({ name });
    if (
      existMaterial !== null &&
      existMaterial?.currentVersion === currentVersion
    ) {
      result.data = { material: existMaterial };
      result.message = '查找物料成功';
      result.success = true;
    } else {
      result.message = `${name} ${currentVersion} 物料不存在或不是最新的`;
    }

    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}
