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
