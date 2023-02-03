import { describe, test, expect, afterAll, beforeAll } from 'vitest';
import md5 from 'md5';
import {
  cleanPort,
  startWorkServer,
  closeWorkServer,
  workServerHost,
  workServerPort,
  nodeFetch
} from './util';

beforeAll(async () => {
  await cleanPort();
  await startWorkServer();
});

afterAll(() => {
  closeWorkServer();
});

describe('work-server', () => {
  test('page /page/sign-in', async () => {
    const url = `http://${workServerHost}:${workServerPort}/page/sign-in`;
    const res = await nodeFetch(url);
    const html = await res.text();
    const expectHtml = `<html>
  <head>
    <meta charset="utf-8" />
    <script type="importmap">
      {
        "imports": {
          "vue": "/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.esm-browser.js"
        }
      }
    </script>
    
        <link href="/public/dist/page/sign-in.css" rel="stylesheet" />
        <script src="/public/dist/lib/vue.js"></script>
        <script src="/public/dist/lib/vue-router.js"></script>
      
  </head>
  <body>
    
    <div id="app">
      
      
    </div>
  </body>
  
        <script src="/public/dist/page/sign-in.js"></script>
      
</html>
`;
    expect(html).toStrictEqual(expectHtml);
  });

  test('no login check /api/get/account/online', async () => {
    const url = `http://${workServerHost}:${workServerPort}/api/get/account/online`;
    const res = await nodeFetch(url);
    const json = await res.json();
    expect(json).toStrictEqual({ username: null, uuid: null });
  });

  test('login action /api/post/account/sign-in', async () => {
    const url = `http://${workServerHost}:${workServerPort}/api/post/account/sign-in`;
    const res = await nodeFetch(url, {
      body: JSON.stringify({
        username: 'admin001',
        password: md5('123456')
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
    const json = await res.json();
    expect(json).toStrictEqual({
      data: { allow: false },
      success: true,
      message: '登录成功'
    });
  });

  test('has login check /api/get/account/online', async () => {
    const loginStatusUrl = `http://${workServerHost}:${workServerPort}/api/get/account/online`;
    const noLoginRes = await nodeFetch(loginStatusUrl);
    const noLoginjson = await noLoginRes.json();
    expect(noLoginjson).toStrictEqual({ username: null, uuid: null });

    // 进行登录
    const signInurl = `http://${workServerHost}:${workServerPort}/api/post/account/sign-in`;
    const signInRes = await nodeFetch(signInurl, {
      body: JSON.stringify({
        username: 'admin001',
        password: md5('88888888')
      }),
      // credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
    const signInHeaders = signInRes.headers;
    const signInJson = await signInRes.json();
    expect(signInJson).toStrictEqual({
      data: {
        allow: true,
        username: 'admin001',
        uuid: '00000000-aaaa-bbbb-cccc-ddddeeee0001'
      },
      success: true,
      message: '登录成功'
    });

    // 登录后再判断登录态
    const cookie = signInHeaders.get('set-cookie') || '';
    const hasLoginRes = await nodeFetch(loginStatusUrl, {
      headers: {
        credentials: 'same-origin',
        cookie
      }
    });
    const hasLoginJson = await hasLoginRes.json();
    expect(hasLoginJson).toStrictEqual({
      allow: true,
      username: 'admin001',
      uuid: '00000000-aaaa-bbbb-cccc-ddddeeee0001'
    });
  });
});
