export function createIframeDocument(data: {
  name: string;
  version: string;
  props: any;
}): string {
  const { name, version, props = {} } = data;
  const { origin } = window.location;
  const doc = `
<html>
  <head>
    <style>html, body { margin: 0; padding: 0; }</style>
    <script type="importmap">
      {
        "imports": {
          "vue": "${origin}/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.esm-browser.js",
          "${name}": "${origin}/public/cdn/material/${name}/${version}/index.esm.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="app">${name} - ${version}</div>
  </body>
  <script type="module">

    async function loadMaterialStyle(params) {
      const { name, version } = params; 
      if (document.querySelector('style[data-material-id="${name}"]')) {
        return;
      }
      const url = \`${origin}/public/cdn/material/${name}/${version}/index.css\`;
      const text = await fetch(url).then((res) => res.text());
      const style = document.createElement('style');
      style.setAttribute('data-material-id', "${name}");
      style.innerHTML = text;
      const head = document.querySelector('head');
      head?.appendChild(style);
    }
  
    async function main() {
      const Vue = await import('vue');
      const Material = await import('${name}');
      await loadMaterialStyle({ name: '${name}', version: '${version}'  })

      const props = ${JSON.stringify(props)};
      const App = Vue.h(Material.default || Material, {...props});
      const app = Vue.createApp(App, {});
      app.mount('#app');
    }
    main();
  </script>
</html>
`;

  return doc;
}
