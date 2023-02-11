import path from 'node:path';
import fs from 'node:fs';
import dayjs from 'dayjs';
import { LOG_DIR } from '../config';
import type { LogType, LogData } from '../types';

export function writeLog(type: LogType, data: LogData): Promise<void> {
  return new Promise((resolve, reject) => {
    const date = dayjs(Date.now()).format('YYYYMMDD');
    const logFilePath = path.join(LOG_DIR, type, `${date}.log`);
    const baseDir = path.dirname(logFilePath);
    data.__time__ = Date.now();
    const text = JSON.stringify(data) + '\r\n';
    if (!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    if (fs.existsSync(logFilePath) && fs.statSync(logFilePath).isFile()) {
      fs.appendFile(logFilePath, text, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      fs.writeFile(logFilePath, text, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
}

export function readLogList(type: LogType) {
  const logDir = path.join(LOG_DIR, type);
  const list: string[] = [];
  if (fs.existsSync(logDir) && fs.statSync(logDir).isDirectory()) {
    const fileList = fs.readdirSync(logDir);
    fileList.forEach((name: string) => {
      if (name.endsWith('.log')) {
        list.push(name);
      }
    });
  }
  return list;
}

export function readLogContent(type: LogType, fileName: string): string | null {
  const logFilePath = path.join(LOG_DIR, type, fileName);
  let content: string | null = null;
  if (fs.existsSync(logFilePath) && fs.statSync(logFilePath).isFile()) {
    content = fs.readFileSync(logFilePath, { encoding: 'utf8' });
  }
  return content;
}
