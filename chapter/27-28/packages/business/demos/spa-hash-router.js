const viewDom = document.querySelector('#view');
const linksDom = document.querySelector('#links');
const viewMap = {
  '#/': '<h1>Default View</h1>',
  '#/home': '<h1>Home View</h1>',
  '#/about': '<h1>About View</h1>',
  '#/page/hello': '<h1>Page Hello View</h1>',
  '#/page/001': '<h1>Page 001 View</h1>',
  '#/page/002': '<h1>Page 002 View</h1>',
  '#/404': '<h1>404 View</h1>'
};

const renderLinks = () => {
  const linkList = Object.keys(viewMap);
  const htmlList = [];
  linkList.forEach((link) => {
    htmlList.push(`<li><a href="${link}">${link}</a></li>`);
  });
  linksDom.innerHTML = htmlList.join('');
};

const renderView = () => {
  const hash = window.location.hash;
  const viewPath = hash.split('?')[0];
  const viewHtml = viewMap[viewPath] || viewMap['#/404'];
  viewDom.innerHTML = viewHtml;
};

window.addEventListener('hashchange', () => {
  renderView();
});

renderLinks();
renderView();
