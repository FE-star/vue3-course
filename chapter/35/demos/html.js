/* eslint-disable no-console */
/* eslint-disable no-undef */
const { createAppHTML, dataList } = require('./html-action');

async function main() {
  const htmlList = [];
  const start = Date.now();
  for (let i = 0; i < dataList.length; i++) {
    const s = Date.now();
    const html = await createAppHTML(dataList[i]);
    htmlList.push(html);
    console.log(
      `编译数据量为 [${dataList[i]}] 的Vue模板，耗时 ${Date.now() - s}ms`
    );
  }
  console.log(`编译HTML结束，总耗时为 ${Date.now() - start}ms`);
}

main();
