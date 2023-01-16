import type { Context } from 'koa';
import Router from '@koa/router';
import { renderCommonPage, renderProdPage } from './controller/page';
import { renderDemo } from './controller/demo';

const router = new Router();
router.get('/', (ctx: Context) => {
  ctx.redirect('/page/home');
});
router.get('/p/:uuid', renderProdPage);

router.get('/page/:pageName', renderCommonPage);
router.get('/page/:pageName/:subPageName', renderCommonPage);

router.get('/demo/:demoName', renderDemo);
router.get('/demo/:demoName/:subDemoName', renderDemo);
const routers = router.routes();

export default routers;
