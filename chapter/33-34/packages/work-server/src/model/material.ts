import { v4 } from 'uuid';
import type { MaterialInfo } from '../types';
import { runSQL, tranformModelData, tranformSQLData } from '../util/db';

export async function createMaterial(
  params: Pick<MaterialInfo, 'name' | 'currentVersion' | 'info' | 'extend'>
) {
  const sql = `
    INSERT INTO \`material_info\` SET ?;
  `;
  const uuid = v4();
  const { name, currentVersion, info, extend } = params;
  const values: any = tranformSQLData({
    uuid,
    name,
    currentVersion,
    info,
    extend,
    status: 1
  });
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { uuid, name, currentVersion };
  } else {
    return null;
  }
}

export async function findMaterialByName(params: {
  name: string;
}): Promise<MaterialInfo | null> {
  const { name } = params;
  const sql = `
    SELECT * FROM \`material_info\` WHERE name = ?;
  `;
  const values = [name];
  const results = await runSQL(sql, values);
  let result = null;
  if (results && results[0] && results[0]?.id >= 0) {
    result = tranformModelData<MaterialInfo>(results[0]);
  }
  return result;
}

export async function findMaterialListByPage(params: {
  pageNum: number;
  pageSize: number;
}): Promise<MaterialInfo[]> {
  const { pageNum, pageSize } = params;
  const sql = `
    SELECT * from \`material_info\`
    ORDER BY id DESC LIMIT ?, ?;`;
  const values = [Math.max(0, pageNum - 1) * pageSize, pageSize];
  const results: any[] = await runSQL(sql, values);
  const list: MaterialInfo[] = [];
  results.forEach((result) => {
    const materialInfo = tranformModelData<MaterialInfo>(result);
    list.push(materialInfo);
  });
  return list;
}

export async function findMaterialByUuid(params: {
  uuid: string;
}): Promise<MaterialInfo | null> {
  const { uuid } = params;
  const sql = `
    SELECT * from \`material_info\` WHERE uuid=?;
  `;
  const values = [uuid];
  const results: any[] = await runSQL(sql, values);
  let info: MaterialInfo | null = null;
  if (results.length > 0) {
    info = tranformModelData<MaterialInfo>(results[0]);
  }
  return info;
}

export async function updateMaterial(
  params: Pick<MaterialInfo, 'uuid' | 'currentVersion' | 'info' | 'extend'>
) {
  const sql = `
    UPDATE \`material_info\` 
    SET current_version=?, info=?, extend=? 
    WHERE uuid=?;
  `;
  const { currentVersion, info, extend, uuid } = params;
  const values: any = [currentVersion, info, extend, uuid];
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { uuid, currentVersion };
  } else {
    return null;
  }
}

export async function countMaterials(): Promise<{ total: number } | null> {
  const sql = `
  SELECT 
    COUNT(*) AS total
  FROM 
    material_info;`;
  const results: any[] = await runSQL(sql, []);
  let info: { total: number } | null = null;
  if (results.length > 0) {
    info = tranformModelData<{ total: number }>(results[0]);
  }
  return info;
}
