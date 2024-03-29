export interface UserInfo {
  id: number;
  uuid: string;
  username: string;
  password: string;
  info: unknown;
  extends: unknown;
  createTime: string;
  modifyTime: string;
}

export interface MyAPIResult {
  data: any;
  success: boolean;
  message: string;
}

export interface MaterialInfo {
  id?: number;
  uuid: string;
  name: string;
  currentVersion: string;
  info: string; // json
  extend: string; // json
  status: number; // 0, 1
  createTime?: string;
  modifyTime?: string;
}

export interface MaterialSnapshot {
  id?: number;
  version: string;
  userUuid: string;
  materialUuid: string;
  extend: string; // json
  status: number; // 0, 1
  createTime?: string;
}

export interface MaterialSnapshotDetail {
  id?: number;
  version: string;
  userUuid: string;
  username: string;
  materialName: string;
  materialUuid: string;
  createTime?: string;
}

export interface PageInfo {
  id?: number;
  uuid: string;
  name: string;
  currentVersion: string;
  layout: string; // json
  info: string; // json
  extend: string; // json
  status: number; // 0, 1
  createTime?: string;
  modifyTime?: string;
}

export interface PageSnapshot {
  id?: number;
  version: string;
  userUuid: string;
  pageUuid: string;
  pageData: string;
  extend: string; // json
  status: number; // 0, 1
  createTime?: string;
}

export interface PageSnapshotDetail {
  id?: number;
  version: string;
  userUuid: string;
  username: string;
  pageName: string;
  pageUuid: string;
  pageData: string;
  createTime?: string;
}

// 列布局
export interface LayoutColumn {
  uuid: string; // 列唯一的uuid，指向物料模块的uuid
  name?: string;
  width: string | number;
}

// 行布局
export interface LayoutRow {
  uuid: string; // 行唯一的uuid
  columns: LayoutColumn[];
}

// 布局
export interface Layout {
  width: number | string;
  rows: LayoutRow[];
}

// 物料模块
interface LayoutModule {
  materialName: string;
  materialVersion: string;
  materialData: Record<string, any>;
}

// 物料模块Map
interface LayoutModuleMap {
  [uuid: string]: LayoutModule;
}

// 完整的页面布局数据
export interface PageLayoutData {
  layout: Layout;
  moduleMap: LayoutModuleMap;
}

export type PageInfoStage = 'ready' | 'test' | 'pre' | 'prod';

export type PageStage = 'test' | 'pre' | 'prod';

export type LogType =
  | 'common'
  | 'portal-front'
  | 'portal-server'
  | 'work-front'
  | 'work-server';

export interface LogInfo {
  id?: number;
  type: LogType;
  info: string; // json
  createTime?: string;
  modifyTime?: string;
}
