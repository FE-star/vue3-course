import type { PageSnapshot } from '../types';
import { runSQL, tranformSQLData } from '../util/db';
import type { PageSnapshotDetail } from '../types';
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
      m.id AS id,
      u.username AS username,
      m.page_name AS page_name,
      m.snapshot_version AS version,
      m.create_time AS create_time
    FROM (
      SELECT 
        ms.id AS id,
        mi.name AS page_name,
        ms.user_uuid AS user_uuid,
        mi.current_version AS current_version,
        ms.version AS snapshot_version,
        ms.create_time AS create_time
      FROM 
        page_snapshot as ms
      LEFT JOIN page_info AS mi ON mi.uuid = ms.page_uuid
      WHERE ms.page_uuid = ?
    ) AS m
    LEFT JOIN user_info AS u ON u.uuid = m.user_uuid
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
