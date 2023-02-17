/* eslint-disable no-console */

// // 单独请求 /001
// const start = Date.now();
// fetch('http://127.0.0.1:9001/001')
//   .then((res) => res.text())
//   .then(() => {
//     console.log(`/001 请求耗时 ${Date.now() - start}ms`);
//   });

// // 单独请求 /002
// const start = Date.now();
// fetch('http://127.0.0.1:9001/002')
//   .then((res) => res.text())
//   .then(() => {
//     console.log(`/002 请求耗时 ${Date.now() - start}ms`);
//   });

// 模拟并发请求两种路径
const startFor002 = Date.now();
console.log('开始执行请求 /002 ...');
fetch('http://127.0.0.1:9001/002')
  .then((res) => res.text())
  .then(() => {
    console.log(`/002 请求耗时 ${Date.now() - startFor002}ms`);
  });

const startFor001 = Date.now();
console.log('开始执行请求 /001 ...');
fetch('http://127.0.0.1:9001/001')
  .then((res) => res.text())
  .then(() => {
    console.log(`/001 请求耗时 ${Date.now() - startFor001}ms`);
  });
