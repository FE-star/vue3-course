import Router from '@koa/router';
import { renderPage } from './controller/page';
import { getData } from './controller/api';

const router = new Router();
router.get('/page/:pageName', renderPage);
router.get('/page/:pageName/:subPageName', renderPage);
router.get('/api/getData', getData);
const routers = router.routes();

export default routers;
