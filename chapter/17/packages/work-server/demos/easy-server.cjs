/* eslint-disable no-console */
/* eslint-disable no-undef */
const http = require('node:http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const html = `
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1>当前页面链接: ${url}</h1>
    </body>
  </html>
  `;
  res.end(html);
});

server.listen(6001, () => {
  console.log('服务已经启动，浏览器打开 http://127.0.0.1:6001/');
});
