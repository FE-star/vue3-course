import type { LogInfo } from '../types';
import { runSQL, tranformModelData } from '../util/db';

export async function createLogInfos(params: { logInfos: LogInfo[] }) {
  const sql = `
    INSERT INTO \`log_info\`(type, info) VALUES ?;
  `;
  const { logInfos } = params;
  const values: any[] = [];
  logInfos.forEach((item) => {
    if (item.info) {
      values.push([item.type, item.info]);
    }
  });
  const results = await runSQL(sql, [values]);
  if (results?.insertId > 0) {
    return { insertId: results?.insertId };
  } else {
    return null;
  }
}

export async function countLogs(): Promise<{ total: number } | null> {
  const sql = `
  SELECT
    COUNT(*) AS total
  FROM
    log_info;`;
  const results: any[] = await runSQL(sql, []);
  let info: { total: number } | null = null;
  if (results.length > 0) {
    info = tranformModelData<{ total: number }>(results[0]);
  }
  return info;
}

export async function findLogInfoListByPage(params: {
  pageNum: number;
  pageSize: number;
}): Promise<LogInfo[]> {
  const { pageNum, pageSize } = params;
  const sql = `
    SELECT * from \`log_info\`
    ORDER BY id DESC LIMIT ?, ?;`;
  const values = [Math.max(0, pageNum - 1) * pageSize, pageSize];
  const results: any[] = await runSQL(sql, values);
  const list: LogInfo[] = [];
  results.forEach((result) => {
    const pageInfo = tranformModelData<LogInfo>(result);
    list.push(pageInfo);
  });
  return list;
}

export async function findPortalPageTrackLogList(params: {
  pagePath: string;
  nearTimestamp: number;
}): Promise<LogInfo[]> {
  const { pagePath, nearTimestamp } = params;
  const nowTimestamp = Date.now();

  const sql = `
  SELECT *
    FROM \`log_info\` 
  WHERE type='portal-front'
  AND info->'$.type'='track'
  AND info->'$.currentLink'=?
  AND info->'$.__time__' BETWEEN ? AND ?
  ORDER BY info->'$.__time__' DESC;
  `;

  const values: any[] = [
    pagePath,
    nowTimestamp * 1 - nearTimestamp * 1,
    nowTimestamp
  ];

  const results: any[] = await runSQL(sql, values);
  const list: any[] = [];
  results.forEach((result) => {
    const pageInfo = tranformModelData<any>(result);
    list.push(pageInfo);
  });
  return list;
}
