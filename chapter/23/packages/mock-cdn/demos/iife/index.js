const { createApp, h } = window.Vue;

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

function loadScript(name) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `/demos/iife/material/${name}.js`;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}

async function runtime() {
  const children = [];
  for (const m of layout.materials) {
    await loadScript(m.name);
    const Module = window[m.name];
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
