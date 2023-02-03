import * as modelPage from '../model/page-info';
import * as modelPageTest from '../model/page-info-test';
import * as modelPagePre from '../model/page-info-pre';
import * as snapshotModel from '../model/page-snapshot';
import * as servicePageTest from './page-info-test';
import * as servicePagePre from './page-info-pre';
import { pushFullPageStage } from './page-static';
import { MyAPIResult, PageInfo } from '../types';

export async function pushPageStage(params: {
  uuid: string;
  stage: 'test' | 'pre' | 'prod';
  userData: { uuid: string };
}): Promise<MyAPIResult> {
  const { uuid, stage, userData } = params;
  let result: MyAPIResult = {
    data: null,
    success: false,
    message: `失败环境${stage}`
  };
  const pageInfo = await modelPage.findPageInfoByUuid({ uuid });
  const testPageInfo: PageInfo | null = await modelPageTest.findPageInfoByUuid({
    uuid
  });
  const prePageInfo: PageInfo | null = await modelPagePre.findPageInfoByUuid({
    uuid
  });
  let infoData = { bundle: true, esm: true, amd: true, stage };
  if (testPageInfo?.info && testPageInfo?.info?.startsWith?.('{')) {
    try {
      infoData = JSON.parse(testPageInfo.info);
      if (infoData.stage === 'prod') {
        result.message = '页面已上线，请重新编辑新版本';
        return result;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  infoData = { ...infoData, ...{ stage } };

  if (!(pageInfo && pageInfo?.uuid === uuid)) {
    result.message = '缺少页面布局数据';
    return result;
  }
  if (stage === 'test' && testPageInfo) {
    result = await servicePageTest.updatePageInfo(testPageInfo);
  } else if (stage === 'pre' && testPageInfo) {
    if (prePageInfo && prePageInfo?.uuid === uuid) {
      result = await servicePagePre.updatePageInfo(testPageInfo);
    } else {
      result = await servicePagePre.createPageInfo(testPageInfo);
    }
  } else if (stage === 'prod' && prePageInfo) {
    await pushFullPageStage({
      uuid,
      version: prePageInfo.currentVersion,
      stage
    });
    // 创建快照
    await snapshotModel.createPageSnapshot({
      version: prePageInfo.currentVersion,
      pageUuid: prePageInfo?.uuid || '',
      pageData: JSON.stringify({
        ...prePageInfo,
        ...{
          info: JSON.stringify(infoData)
        }
      }),
      userUuid: userData.uuid,
      extend: '{}'
    });
    result.success = true;
    result.message = `成功发布到环境${stage}`;
  }

  if (stage === 'prod' && result.success === true && prePageInfo) {
    await modelPage.updatePageInfo({
      ...prePageInfo,
      ...{
        info: JSON.stringify(infoData)
      }
    });
  }
  if (result.success) {
    // 发布流程的状态数据，都以测试数据为准
    await modelPageTest.updatePageInfoData({
      uuid,
      info: JSON.stringify(infoData)
    });
  }
  return result;
}
