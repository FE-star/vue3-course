import { runSQL, tranformSQLData } from '../util/db';
import type { PageSnapshotDetail, PageSnapshot } from '../types';
import { tranformModelData } from '../util/db';

export async function createPageSnapshot(
  params: Omit<PageSnapshot, 'id' | 'createTime' | 'status'>
) {
  const sql = `
    INSERT INTO \`page_snapshot\` SET ?;
  `;
  const { version, userUuid, pageUuid, pageData, extend } = params;
  const values: any = tranformSQLData({
    version,
    userUuid,
    pageUuid,
    pageData,
    extend: JSON.stringify(extend),
    status: 1
  });
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { version, userUuid, pageUuid, extend };
  } else {
    return null;
  }
}

export async function findPageSnapshotDetailListByPage(params: {
  pageNum: number;
  pageSize: number;
  pageUuid: string;
}): Promise<PageSnapshotDetail[]> {
  const { pageNum, pageSize, pageUuid } = params;
  const sql = `
    SELECT
      p.id AS id,
      u.username AS username,
      p.page_name AS page_name,
      p.snapshot_version AS version,
      p.page_data AS page_data,
      p.create_time AS create_time
    FROM (
      SELECT 
        ps.id AS id,
        pi.name AS page_name,
        ps.user_uuid AS user_uuid,
        pi.current_version AS current_version,
        ps.page_data AS page_data,
        ps.version AS snapshot_version,
        ps.create_time AS create_time
      FROM 
        page_snapshot as ps
      LEFT JOIN page_info AS pi ON pi.uuid = ps.page_uuid
      WHERE ps.page_uuid = ?
    ) AS p
    LEFT JOIN user_info AS u ON u.uuid = p.user_uuid
    ORDER BY id DESC LIMIT ?, ?;  
  `;
  const values = [pageUuid, Math.max(0, pageNum - 1) * pageSize, pageSize];
  const results: any[] = await runSQL(sql, values);
  const list: PageSnapshotDetail[] = [];
  results.forEach((result) => {
    const pageInfo = tranformModelData<PageSnapshotDetail>(result);
    list.push(pageInfo);
  });
  return list;
}

export async function countPageSnapshots(params: {
  pageUuid: string;
}): Promise<{ total: number } | null> {
  const { pageUuid } = params;
  const sql = `
  SELECT 
    COUNT(*) AS total
  FROM 
    page_snapshot
  WHERE page_uuid = ?  
  `;
  const values = [pageUuid];
  const results: any[] = await runSQL(sql, values);
  let info: { total: number } | null = null;
  if (results.length > 0) {
    info = tranformModelData<{ total: number }>(results[0]);
  }
  return info;
}

export async function findPageShapshotByUuidAndVersion(params: {
  uuid: string;
  version: string;
}): Promise<PageSnapshot | null> {
  const { uuid, version } = params;
  const sql = `
    SELECT * from \`page_snapshot\` WHERE page_uuid=? AND version=?;
  `;
  const values = [uuid, version];
  const results: any[] = await runSQL(sql, values);
  let info: PageSnapshot | null = null;
  if (results.length > 0) {
    info = tranformModelData<PageSnapshot>(results[0]);
  }
  return info;
}
