/* eslint-disable no-console */
/* eslint-disable no-undef */
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const maxProcessCount = os.cpus().length;
// 待启动多进程的 后台服务入口文件
const entryFile = path.join(__dirname, 'dist', 'index.cjs');

let reforkCount = 0;
const maxTryCount = 1000;

function startDaemon() {
  if (cluster.isWorker) {
    return;
  }

  // 在线的进程数量
  let onlineProcessCount = 0;

  // 启动主线程
  cluster.setupMaster({ exec: entryFile });

  for (let i = 0; i < maxProcessCount; i++) {
    // 创建多个子进程
    forkWorker();
  }

  function forkWorker() {
    // 保证在线进程数量小于限制的进程数量
    if (onlineProcessCount >= maxProcessCount) {
      return;
    }
    onlineProcessCount++;
    return cluster.fork();
  }

  function reforkWorker() {
    console.log('尝试重新开启新线程 ...');
    reforkCount++;
    if (reforkCount >= maxTryCount) {
      throw Error('已经超出最多尝试次数');
    }
    return forkWorker();
  }

  cluster.on('exit', (worker) => {
    console.log(`进程 pid=${worker.process.pid} 已经退出`);
    reforkWorker();
  });

  cluster.on('disconnect', (worker) => {
    console.log(`进程 pid=${worker.process.pid} 已经断开连接`);
    if (worker.isDead && worker.isDead()) {
      console.log(`进程 pid=${worker.process.pid} 已经挂掉了`);
      return;
    }
    onlineProcessCount--;
    reforkWorker();
  });
}

startDaemon();
