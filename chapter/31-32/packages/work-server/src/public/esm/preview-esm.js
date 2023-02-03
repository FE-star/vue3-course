const CDN_BASE_URL = '/public/cdn/';

async function loadMaterialESModule(params) {
  const { name, version } = params;
  const result = await import(
    /* @vite-ignore */
    `${CDN_BASE_URL}material/${name}/${version}/index.esm.js`
  );
  const Module = result?.default || result;
  return Module;
}

function createDynamicModule(params) {
  const { Vue, props, name, version, width, colIndex } = params;
  const { ref, onMounted, defineComponent, h } = Vue;
  const DynamicModule = defineComponent({
    setup() {
      const container = ref();
      onMounted(async () => {
        if (!(name && version)) {
          return;
        }
        const Module = await loadMaterialESModule({ name, version });
        if (!Module) {
          return;
        }
        const App = Vue.h(Module, props || {});
        const app = Vue.createApp(App, {});
        app.mount(container.value);
      });

      return () => {
        return h('div', {
          ref: container,
          style: { width },
          'data-column': colIndex
        });
      };
    }
  });
  return DynamicModule;
}

async function renderPage(pageLayoutData) {
  const libVueName = 'vue';
  const Vue = await import(libVueName);
  const { createApp, h, defineComponent } = Vue;

  const App = defineComponent({
    setup() {
      const Rows = pageLayoutData.layout.rows.map((row, rowIndex) => {
        const Columns = row.columns.map((col, colIndex) => {
          const module = pageLayoutData.moduleMap?.[col.uuid];
          const props = module?.materialData || {};
          const name = module?.materialName;
          const version = module?.materialVersion;
          const Material = createDynamicModule({
            name,
            version,
            props,
            Vue,
            width: col.width,
            colIndex
          });
          const mod = h(Material);
          return mod;
        });
        return h(
          'div',
          {
            style: {
              margin: '10px 0',
              display: 'flex',
              flexDirection: 'row'
            },
            'data-row': rowIndex
          },
          Columns
        );
      });
      return () => {
        return h(
          'div',
          { style: { width: pageLayoutData.layout.width, margin: '0 auto' } },
          Rows
        );
      };
    }
  });
  const app = createApp(App);
  app.mount('#app');
}

async function run() {
  const pageResultData = window.pageResultData;
  if (pageResultData.success) {
    const pageLayoutData = JSON.parse(pageResultData?.data?.layout);
    renderPage(pageLayoutData);
  } else {
    window.alert(pageResultData?.message || '页面出错');
  }
}

run();
