const viewDom = document.querySelector('#view');
const linksDom = document.querySelector('#links');
const viewMap = {
  '/': '<h1>Default View</h1>',
  '/home': '<h1>Home View</h1>',
  '/about': '<h1>About View</h1>',
  '/page/hello': '<h1>Page Hello View</h1>',
  '/page/001': '<h1>Page 001 View</h1>',
  '/page/002': '<h1>Page 002 View</h1>',
  '/404': '<h1>404 View</h1>'
};

const renderLinks = () => {
  const linkList = Object.keys(viewMap);
  const htmlList = [];
  linkList.forEach((link) => {
    htmlList.push(
      `<li>
        <a class="${
          link === location.pathname ? 'active' : ''
        }" href="javascript:void(0)" data-href="${link}">${link}</a>
      </li>`
    );
  });
  linksDom.innerHTML = htmlList.join('');
};

const renderView = () => {
  const viewPath = window.location.pathname;
  const viewHtml = viewMap[viewPath] || viewMap['#/404'];
  viewDom.innerHTML = viewHtml;
};

// 人工注册history路由的pushState和replaceState监听
// 因为浏览器原生不支持
function registerHistoryListener(type) {
  const originFunc = window.history[type];
  const e = new Event(type);
  return function () {
    const result = originFunc.apply(this, arguments);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return result;
  };
}

// 人工实现history路由的pushState事件监听
history.pushState = registerHistoryListener('pushState');
// 人工实现history路由的replaceState事件监听
history.replaceState = registerHistoryListener('replaceState');

// 监听history路由pushState
window.addEventListener('pushState', () => {
  renderLinks();
  renderView();
});
// 监听history路由replaceState
window.addEventListener('replaceState', () => {
  renderLinks();
  renderView();
});

linksDom.addEventListener('click', (e) => {
  // 链接点击之间时候
  // 拦截事件，然后做 history跳转操作
  const dom = e.target;
  const dataHref = dom.getAttribute('data-href');
  if (dataHref) {
    history.pushState({}, '', dataHref);
  }
});

renderLinks();
renderView();
