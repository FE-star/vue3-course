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
  info: Record<string, any>; // TODO
  extend: Record<string, any>; // TODO
  status: number; // 0, 1
  createTime?: string;
  modifyTime?: string;
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
