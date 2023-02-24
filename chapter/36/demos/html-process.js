/* eslint-disable no-console */
/* eslint-disable no-undef */
const cluster = require('cluster');
const { createAppHTML, dataList } = require('./html-action');

const htmlList = [];
// 进程数量为 多次密集计算的数量
const processCount = dataList.length;

if (cluster.isMaster) {
  // 进入主进程
  console.log('Main Process: 主进程');
  const mainStart = Date.now();

  for (let i = 0; i < processCount; i++) {
    // 启动多进程来并发执行任务
    const worker = cluster.fork();
    worker.send({ count: dataList[i] });

    // 进程之间的IPC通信
    // 主进程向子进程发送任务数据
    worker.on('message', (data) => {
      htmlList.push(data.html);
      console.log(
        `Child Process (${worker.process.pid}) 子进程执行耗时：${data.time}ms`
      );
      if (htmlList.length >= dataList.length) {
        console.log(`执行全部结束，总耗时: ${Date.now() - mainStart}ms`);
        process.exit(0);
      }
      // 子进程执行完任务后，退出子进程
      worker.kill();
    });
    // worker.on('exit', () => {
    //   console.log(`退出子进程 ${worker.process.pid}`);
    // });
  }
} else {
  console.log(`Child Process: 启动子进程 (pid: ${process.pid})`);
  // 进程之间的IPC通信
  // 接收主进程的消息
  process.on('message', (data) => {
    const start = Date.now();
    // 执行Vue.js服务端渲染的密集计算
    createAppHTML(data.count).then((html) => {
      // 通过IPC，向主进程发送消息
      process.send({ html, time: Date.now() - start });
    });
  });
}
