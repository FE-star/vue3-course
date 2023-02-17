import { cleanLogs } from '@my/mock-logger';
import type { MyAPIResult } from '../types';
import * as logModel from '../model/log-info';
import type { LogType } from '../types';

let isCleaning = false;

export async function cleanLogInfos(params: { type: LogType }) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '创建失败'
  };
  if (isCleaning) {
    result.message = '正在清理日志，稍后再试';
    setTimeout(() => {
      isCleaning = false;
    }, 10 * 1000);
    return result;
  }
  try {
    isCleaning = true;
    const { type } = params;
    const logs = cleanLogs(type);
    const logInfos = logs.map((log: string) => {
      return { type, info: log };
    });
    if (Array.isArray(logInfos) && logInfos.length > 0) {
      const createResult = await logModel.createLogInfos({ logInfos });
      result.data = createResult;
      result.success = true;
      result.message = '日志处理成功';
      isCleaning = false;
    } else {
      result.message = '暂无日志数据';
    }

    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  isCleaning = false;
  return result;
}

export async function getLogInfoList(params: {
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
    const list = await logModel.findLogInfoListByPage({
      pageNum,
      pageSize
    });
    const countResult = await logModel.countLogs();
    result.data = { list, total: countResult?.total, pageSize, pageNum };
    result.success = true;
    result.message = '页面日志成功';
    return result;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}

export async function getPageTrackLog(params: {
  pagePath: string;
  nearTimestamp: number;
}) {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  try {
    const list = await logModel.findPortalPageTrackLogList(params);
    result.data = {
      list
    };
    result.success = true;
    result.message = '页面日志成功';
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    result.message = err?.toString() || '出现异常';
  }
  return result;
}
