const layout = {
  materials: [
    {
      name: 'counter-increase'
    },
    {
      name: 'counter-decrease'
    }
  ]
};

window.requirejs.config({
  baseUrl: '/demos/amd/material/',
  paths: {}
});

window.define('vue', [], function () {
  return window.Vue;
});

function runtime() {
  window.require(
    ['vue', 'require', ...layout.materials.map((m) => m.name)],
    function (Vue, require) {
      const { createApp, h } = Vue;
      const children = [];
      for (const m of layout.materials) {
        const Module = require(m.name);
        children.push(h(Module?.default || Module));
      }
      const App = h('div', {}, children);
      const app = createApp({
        render() {
          return h(App, {});
        }
      });
      app.mount('#app');
    }
  );
}

runtime();
