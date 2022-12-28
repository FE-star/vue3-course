import Router from '@koa/router';
import { renderPage } from './controller/page';
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
  getMaterialList
} from './controller/material';
import { getMaterialSnapshotList } from './controller/material-snapshot';

const router = new Router();
router.get('/page/:pageName', checkAccountOnlineStatus, renderPage);
router.get(
  '/page/:pageName/:subPageName',
  checkAccountOnlineStatus,
  renderPage
);
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
const routers = router.routes();

export default routers;
