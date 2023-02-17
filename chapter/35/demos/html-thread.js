/* eslint-disable no-console */
/* eslint-disable no-undef */
const {
  isMainThread,
  workerData,
  Worker,
  parentPort
} = require('worker_threads');
const { createAppHTML, dataList } = require('./html-action');

const htmlList = [];
// 线程数量为 多次密集计算的数量
const threadCount = dataList.length;

if (isMainThread) {
  // 如果是在主线程内
  console.log('Main Thread: 主线程');
  const mainStart = Date.now();
  // 触发多线程
  for (let i = 0; i < threadCount; i++) {
    // 将多次Vue.js服务端渲染的密集计算分配给子线程
    const worker = new Worker(__filename, {
      workerData: { count: dataList[i] }
    });
    // 线程间的通信
    worker.on('message', (data) => {
      htmlList.push(data.html);
      console.log(
        `Child Thread (${worker.threadId}) 子线程执行耗时：${data.time}ms`
      );
      if (htmlList.length >= dataList.length) {
        console.log(`执行全部结束，总耗时: ${Date.now() - mainStart}ms`);
      }
      // 子线程执行完计算后，触发结束子线程
      worker.emit('end');
    });
    // worker.on('exit', () => {
    //   console.log(`退出子线程 ${worker.threadId}`);
    // });
  }
} else {
  // 如果进入子线程
  // 并行帮忙执行分配的任务
  console.log(`Child Thread: 启动子线程， 初始数据：${workerData.count}`);
  const start = Date.now();
  createAppHTML(workerData.count).then((html) => {
    parentPort.postMessage({ html, time: Date.now() - start });
  });
}
