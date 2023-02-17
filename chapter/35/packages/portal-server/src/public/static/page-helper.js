/* eslint-disable no-console */
(function () {
  let hasShowHelper = false;
  function renderHelper() {
    const body = document.querySelector('body');
    if (hasShowHelper === true) {
      return;
    }
    let canSupportESM = true;
    try {
      import('vue')
        .then(() => {
          canSupportESM = true;
        })
        .catch((err) => {
          console.warn(err);
          canSupportESM = false;
        });
    } catch (err) {
      console.warn(err);
      canSupportESM = false;
    }
    const moduleMode = canSupportESM ? 'esm' : 'amd';
    let fixLink = window.location.href;
    if (window.location.search?.startsWith('?')) {
      fixLink = `${fixLink}&runModule=${moduleMode}`;
    } else {
      fixLink = `${fixLink}?runModule=${moduleMode}`;
    }
    const css = [
      'z-index: 999999',
      'position: fixed',
      'top: 0',
      'right: 0',
      'left: 0',
      'height: 40px',
      'text-align: center',
      'line-height: 40px',
      'color: #972c0a',
      'font-size: 14px',
      'background: #ffc10759',
      'box-shadow: 2px 2px 6px #31303033',
      'border-bottom: 1px solid #ffc107'
    ];
    const html = `
      <div style="${css.join(';')}">
        <span>页面可能出现了点问题，如不可用，请点击</span>
        <a href="${fixLink}">处理问题</a>
        <span>继续使用页面</span>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild(div);
    hasShowHelper = true;
  }
  window.addEventListener('error', (err) => {
    console.log('监听到异常报错: ', err);
    // 处理后续的页面降级处理
    renderHelper();

    // 记录异常日志
    fetch('/api/log/push', {
      body: JSON.stringify({
        type: 'error',
        message: { errorMessage: err.message }
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
  });

  // // 测试代码
  // window.addEventListener('load', () => {
  //   // 页面加载后3秒报错
  //   setTimeout(() => {
  //     throw Error('这是一个异常错误');
  //   }, 1000);
  // });

  window.addEventListener('DOMContentLoaded', () => {
    // 记录上游日志
    fetch('/api/log/push', {
      body: JSON.stringify({
        type: 'track',
        message: '',
        currentLink: window.location.href.replace(window.location.origin, ''),
        trackPrevLink: document.referrer.replace(window.location.origin, '')
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
    const body = document.querySelector('body');
    // 监听所有点击前的操作
    body.addEventListener('click', (event) => {
      let currentTarget = event.target;
      while (currentTarget.parentElement) {
        if (currentTarget.nodeName === 'A') {
          const url = currentTarget.getAttribute('href');
          if (url) {
            // 记录下游日志
            fetch('/api/log/push', {
              body: JSON.stringify({
                type: 'track',
                message: '',
                currentLink: window.location.href.replace(
                  window.location.origin,
                  ''
                ),
                trackNextLink: url.replace(window.location.origin, '')
              }),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST'
            });
            event.preventDefault();
            setTimeout(() => {
              window.location.href = url;
            }, 200);
            break;
          }
        }
        currentTarget = currentTarget.parentElement;
      }
    });
  });
})();
