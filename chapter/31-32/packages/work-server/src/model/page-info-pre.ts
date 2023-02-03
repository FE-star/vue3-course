import type { PageInfo } from '../types';
import { runSQL, tranformModelData, tranformSQLData } from '../util/db';

export async function createPageInfo(
  params: Pick<
    PageInfo,
    'uuid' | 'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >
) {
  const sql = `
    INSERT INTO \`page_info_pre\` SET ?;
  `;
  const { uuid, name, currentVersion, layout, info, extend } = params;
  const values: any = tranformSQLData({
    uuid,
    name,
    currentVersion,
    layout,
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

export async function findPageInfoByUuid(params: {
  uuid: string;
}): Promise<PageInfo | null> {
  const { uuid } = params;
  const sql = `
    SELECT * from \`page_info_pre\` WHERE uuid=?;
  `;
  const values = [uuid];
  const results: any[] = await runSQL(sql, values);
  let info: PageInfo | null = null;
  if (results.length > 0) {
    info = tranformModelData<PageInfo>(results[0]);
  }
  return info;
}

export async function updatePageInfo(
  params: Pick<
    PageInfo,
    'uuid' | 'name' | 'currentVersion' | 'layout' | 'info' | 'extend'
  >
) {
  const sql = `
    UPDATE \`page_info_pre\` 
    SET current_version=?, name=?, layout=?, info=?, extend=? 
    WHERE uuid=?;
  `;
  const { currentVersion, name, layout, info, extend, uuid } = params;
  const values: any = [currentVersion, name, layout, info, extend, uuid];
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { uuid, currentVersion };
  } else {
    return null;
  }
}

export async function countPages(): Promise<{ total: number } | null> {
  const sql = `
  SELECT 
    COUNT(*) AS total
  FROM 
    page_info_pre;`;
  const results: any[] = await runSQL(sql, []);
  let info: { total: number } | null = null;
  if (results.length > 0) {
    info = tranformModelData<{ total: number }>(results[0]);
  }
  return info;
}

export async function findPageListByPage(params: {
  pageNum: number;
  pageSize: number;
}): Promise<PageInfo[]> {
  const { pageNum, pageSize } = params;
  const sql = `
    SELECT * from \`page_info_pre\`
    ORDER BY id DESC LIMIT ?, ?;`;
  const values = [Math.max(0, pageNum - 1) * pageSize, pageSize];
  const results: any[] = await runSQL(sql, values);
  const list: PageInfo[] = [];
  results.forEach((result) => {
    const pageInfo = tranformModelData<PageInfo>(result);
    list.push(pageInfo);
  });
  return list;
}

export async function updatePageInfoData(
  params: Pick<PageInfo, 'uuid' | 'info'>
) {
  const sql = `
    UPDATE \`page_info_pre\` 
    SET info=? 
    WHERE uuid=?;
  `;
  const { info, uuid } = params;
  const values: any = [info, uuid];
  const results = await runSQL(sql, values);
  if (results?.insertId > 0) {
    return { uuid };
  } else {
    return null;
  }
}
