export type LogType =
  | 'common'
  | 'work-front'
  | 'work-server'
  | 'portal-front'
  | 'portal-server';

export type LogData = Record<string, string | number>;
