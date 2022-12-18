/* eslint-disable no-console */
import path from 'node:path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';
import routers from './router';
import { getServerDir } from './util/file';

const app = new Koa();

const publicDirPath = path.join(getServerDir(), 'public');
app.use(koaMount('/public', koaStatic(publicDirPath)));
app.use(routers);

const port = 8001;

app.listen(port, () => {
  console.log('服务启动: http://127.0.0.1:' + port);
});
