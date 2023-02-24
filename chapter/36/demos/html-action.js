/* eslint-disable no-undef */

const { h, renderList, toDisplayString, createSSRApp } = require('vue');
const { renderToString } = require('vue/server-renderer');

// Vue.js组件
const Item = {
  props: { index: Number, text: String },
  setup(props) {
    const { text, index } = props;
    return () => {
      return h('div', { class: 'v-item' }, [
        toDisplayString(index),
        toDisplayString(text)
      ]);
    };
  }
};

// Vue.js组件
const List = {
  props: {
    list: Array
  },
  setup(props) {
    const { list } = props;
    return () => {
      return h(
        'ul',
        { class: 'v-list' },
        renderList(list, (item, index) => {
          return h('li', null, [
            h('li', null, [h(Item, { text: item.text, index: index })])
          ]);
        })
      );
    };
  }
};

// Vue.js服务端渲染代码
// 按count数量，循环拼接Vue.js组件HTML字符串
async function createAppHTML(count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({ text: `data-${i}` });
  }
  const app = createSSRApp(List, { list });
  const html = await renderToString(app);
  return html;
}

// 循环次数列表
const dataList = [100000, 200000, 300000, 400000];

module.exports = {
  createAppHTML,
  dataList
};
