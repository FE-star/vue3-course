import path from 'node:path';
import fs from 'node:fs';
import { LOG_DIR } from '../config';
import { readLogList, readLogContent } from './util';
import type { LogType } from '../types';

function rmLog(type: LogType, name: string): void {
  const logFilePath = path.join(LOG_DIR, type, name);
  if (fs.existsSync(logFilePath) && fs.statSync(logFilePath).isFile()) {
    fs.rmSync(logFilePath);
  }
}

export function cleanLogs(type: LogType): string[] {
  const list = readLogList(type);
  let result: string[] = [];
  list.forEach((name: string) => {
    const content = readLogContent(type, name);
    if (typeof content === 'string') {
      let logList = content.replace(/\r\n\r\n/gi, '\r\n').split('\r\n');
      logList = logList.map((log) => {
        return log.trim().replace(/\r\n$/, '');
      });
      result = result.concat(logList);
    }
    rmLog(type, name);
  });
  return result;
}
