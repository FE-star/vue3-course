import Router from '@koa/router';
import { renderPage } from './controller/page';
import { renderDemo } from './controller/demo';

const router = new Router();
router.get('/page/:pageName', renderPage);
router.get('/page/:pageName/:subPageName', renderPage);

router.get('/demo/:demoName', renderDemo);
router.get('/demo/:demoName/:subDemoName', renderDemo);
const routers = router.routes();

export default routers;
