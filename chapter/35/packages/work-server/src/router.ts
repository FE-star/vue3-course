import type { Context } from 'koa';
import Router from '@koa/router';
import {
  renderPage,
  renderPreview,
  renderPreviewTest,
  renderPreviewPre
} from './controller/page';
import {
  signIn,
  signUp,
  signOut,
  getOnlineUser,
  checkAccountOnlineStatus,
  filterLoginStatus
} from './controller/user';
import {
  createMaterial,
  updateMaterial,
  getMaterialData,
  getMaterialList,
  checkMaterialExist
} from './controller/material';
import {
  // createPageInfo,
  // updatePageInfo,
  getPageData,
  getPageList
} from './controller/page-info';

import {
  createReadyPageInfo,
  updateReadyPageInfo,
  getReadyPageData
} from './controller/page-info-ready';
import { getMaterialSnapshotList } from './controller/material-snapshot';
import { getPageSnapshotList } from './controller/page-snapshot';
import { publishPageStage } from './controller/page-stage';
import { revertPage } from './controller/page-revert';
import { cleanLog, getLogList, getPageTrackLog } from './controller/log-info';

const router = new Router();
router.get('/', (ctx: Context) => {
  ctx.redirect('/page/home');
});
router.get('/page/:pageName', checkAccountOnlineStatus, renderPage);
router.get(
  '/page/:pageName/:subPageName',
  checkAccountOnlineStatus,
  renderPage
);
router.get('/preview/:pageUuid/:version/:type', renderPreview);
router.get('/preview-test/:pageUuid/:version/:type', renderPreviewTest);
router.get('/preview-pre/:pageUuid/:version/:type', renderPreviewPre);
router.post('/api/post/account/sign-in', signIn);
router.post('/api/post/account/sign-up', signUp);
router.get('/api/get/account/sign-out', signOut);
router.get('/api/get/account/online', getOnlineUser);
router.post('/api/post/material/create', filterLoginStatus, createMaterial);
router.post('/api/post/material/update', filterLoginStatus, updateMaterial);
router.get('/api/get/material/data', filterLoginStatus, getMaterialData);
router.get('/api/get/material/list', filterLoginStatus, getMaterialList);
router.get(
  '/api/get/material-snapshot/list',
  filterLoginStatus,
  getMaterialSnapshotList
);
router.get('/api/get/material/check-exist', checkMaterialExist);

// router.post('/api/post/page-info/create', filterLoginStatus, createPageInfo);
// router.post('/api/post/page-info/update', filterLoginStatus, updatePageInfo);
router.get('/api/get/page-info/data', filterLoginStatus, getPageData);
router.post(
  '/api/post/page-info-ready/create',
  filterLoginStatus,
  createReadyPageInfo
);
router.post(
  '/api/post/page-info-ready/update',
  filterLoginStatus,
  updateReadyPageInfo
);
router.get(
  '/api/get/page-info-ready/data',
  filterLoginStatus,
  getReadyPageData
);

router.get('/api/get/page-info/list', filterLoginStatus, getPageList);
router.get(
  '/api/get/page-snapshot/list',
  filterLoginStatus,
  getPageSnapshotList
);
router.post(
  '/api/post/page-stage/publish',
  filterLoginStatus,
  publishPageStage
);
router.post('/api/post/page-revert/revert', filterLoginStatus, revertPage);
router.post('/api/post/log/clean', filterLoginStatus, cleanLog);
router.get('/api/get/log/list', filterLoginStatus, getLogList);
router.get('/api/get/log/page-track', filterLoginStatus, getPageTrackLog);

const routers = router.routes();

export default routers;
