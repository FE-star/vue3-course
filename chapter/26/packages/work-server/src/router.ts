import type { Context } from 'koa';
import Router from '@koa/router';
import { renderPage, renderPreview } from './controller/page';
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
  createPage,
  updatePage,
  getPageData,
  getPageList
} from './controller/page-info';
import { getMaterialSnapshotList } from './controller/material-snapshot';

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

router.post('/api/post/page-info/create', filterLoginStatus, createPage);
router.post('/api/post/page-info/update', filterLoginStatus, updatePage);
router.get('/api/get/page-info/data', filterLoginStatus, getPageData);
router.get('/api/get/page-info/list', filterLoginStatus, getPageList);
const routers = router.routes();

export default routers;
