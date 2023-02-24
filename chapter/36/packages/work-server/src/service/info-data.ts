import type { PageInfoStage } from '../types';

export function changePageInfoStage(
  stage: PageInfoStage,
  info?: string
): string {
  let resultInfo: Record<string, any> = {
    bunlde: true,
    esm: true,
    amd: true,
    stage,
    revertFrom: null
  };
  if (typeof info === 'string' && info.startsWith('{')) {
    const infoObj = JSON.parse(info);
    resultInfo = {
      ...resultInfo,
      ...infoObj,
      ...{ stage }
    };
  }
  const result = JSON.stringify(resultInfo);
  return result;
}

export function changePageInfoRevertVersion(
  snapshotVersion: string,
  info?: string
): string {
  let resultInfo: Record<string, any> = {
    bunlde: true,
    esm: true,
    amd: true,
    stage: null,
    revertFrom: snapshotVersion
  };
  if (typeof info === 'string' && info.startsWith('{')) {
    const infoObj = JSON.parse(info);
    resultInfo = {
      ...resultInfo,
      ...infoObj,
      ...{ revertFrom: snapshotVersion }
    };
  }
  const result = JSON.stringify(resultInfo);
  return result;
}
