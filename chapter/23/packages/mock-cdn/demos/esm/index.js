import { createApp, h } from 'vue';

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

async function runtime() {
  const children = [];
  for (const m of layout.materials) {
    const Module = await import(`/demos/esm/material/${m.name}.js`);
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

runtime();
