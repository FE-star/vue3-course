import type { MaterialSnapshot } from '../types';
import { runSQL, tranformSQLData } from '../util/db';
import type { MaterialSnapshotDetail } from '../types';
import { tranformModelData } from '../util/db';

export async function createMaterialSnapshot(
  params: Omit<MaterialSnapshot, 'id' | 'createTime' | 'status'>
) {
  const sql = `
    INSERT INTO \`material_snapshot\` SET ?;
  `;
  const { version, userUuid, materialUuid, extend } = params;
  const values: any = tranformSQLData({
    version,
    userUuid,
    materialUuid,
    extend: JSON.stringify(extend),
    status: 1
  });
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { version, userUuid, materialUuid, extend };
  } else {
    return null;
  }
}

export async function findMaterialSnapshotDetailListByPage(params: {
  pageNum: number;
  pageSize: number;
  materialUuid: string;
}): Promise<MaterialSnapshotDetail[]> {
  const { pageNum, pageSize, materialUuid } = params;
  const sql = `
    SELECT
      m.id AS id,
      u.username AS username,
      m.material_name AS material_name,
      m.snapshot_version AS version,
      m.create_time AS create_time
    FROM (
      SELECT 
        ms.id AS id,
        mi.name AS material_name,
        ms.user_uuid AS user_uuid,
        mi.current_version AS current_version,
        ms.version AS snapshot_version,
        ms.create_time AS create_time
      FROM 
        material_snapshot as ms
      LEFT JOIN material_info AS mi ON mi.uuid = ms.material_uuid
      WHERE ms.material_uuid = ?
    ) AS m
    LEFT JOIN user_info AS u ON u.uuid = m.user_uuid
    ORDER BY id DESC LIMIT ?, ?;  
  `;
  const values = [materialUuid, Math.max(0, pageNum - 1) * pageSize, pageSize];
  const results: any[] = await runSQL(sql, values);
  const list: MaterialSnapshotDetail[] = [];
  results.forEach((result) => {
    const materialInfo = tranformModelData<MaterialSnapshotDetail>(result);
    list.push(materialInfo);
  });
  return list;
}

export async function countMaterialSnapshots(params: {
  materialUuid: string;
}): Promise<{ total: number } | null> {
  const { materialUuid } = params;
  const sql = `
  SELECT 
    COUNT(*) AS total
  FROM 
    material_snapshot
  WHERE material_uuid = ?  
  `;
  const values = [materialUuid];
  const results: any[] = await runSQL(sql, values);
  let info: { total: number } | null = null;
  if (results.length > 0) {
    info = tranformModelData<{ total: number }>(results[0]);
  }
  return info;
}
