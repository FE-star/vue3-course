import { writeLog } from './util';
import type { LogData } from '../types';

export function writeWorkServerLog(data: LogData): Promise<void> {
  return writeLog('work-server', data);
}

export function writeWorkFrontLog(data: LogData): Promise<void> {
  return writeLog('work-front', data);
}

export function writePortalServerLog(data: LogData): Promise<void> {
  return writeLog('portal-server', data);
}

export function writePortalFrontLog(data: LogData): Promise<void> {
  return writeLog('portal-front', data);
}

export function writeCommonLog(data: LogData): Promise<void> {
  return writeLog('common', data);
}
