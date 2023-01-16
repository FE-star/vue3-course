/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MyAPIResult, PageLayoutData } from '../../pages/manage/types';

const CDN_BASE_URL = '/public/cdn/';

function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}

async function initAMDEnv(params: {
  materialName: string;
  materialVersion: string;
}) {
  const { materialName, materialVersion } = params;
  // @ts-ignore
  if (!window.requirejs) {
    await loadScript('/public/cdn/pkg/requirejs/2.3.6/require.js');
  }
  const paths: Record<string, string> = {};
  // @ts-ignore
  window.define('vue', [], () => Vue);
  paths[
    materialName
  ] = `/public/cdn/material/${materialName}/${materialVersion}/index.amd`;

  // @ts-ignore
  window.requirejs.config({
    paths
  });
}

async function loadMaterialAMDModule(params: {
  name: string;
  version: string;
}): Promise<any> {
  const { name, version } = params;

  const result: any = await import(
    /* @vite-ignore */
    `${CDN_BASE_URL}material/${name}/${version}/index.amd.js`
  );
  const Module: any = result?.default || result;
  return Module;
}

function createDynamicModule(params: {
  name: string;
  version: string;
  width: number | string;
  colIndex: number;
  props: any;
  Vue: any;
}) {
  const { Vue, props, name, version, width, colIndex } = params;
  const { ref, onMounted, defineComponent, h } = Vue;
  const DynamicModule = defineComponent({
    setup() {
      const container = ref();
      onMounted(async () => {
        if (!(name && version)) {
          return;
        }
        await initAMDEnv({
          materialName: name,
          materialVersion: version
        });

        window.require(
          ['vue', name],
          // @ts-ignore
          (Vue: any, Module: any) => {
            const App = Vue.h(Module, props || {});
            const app = Vue.createApp(App, {});
            app.mount(container.value);
          }
        );
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

async function renderPage(pageLayoutData: PageLayoutData) {
  const Vue = window.Vue;
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
  // @ts-ignore
  const pageResultData = window.pageResultData as MyAPIResult;
  if (pageResultData.success) {
    const pageLayoutData = JSON.parse(
      pageResultData?.data?.layout
    ) as PageLayoutData;
    renderPage(pageLayoutData);
  } else {
    window.alert(pageResultData?.message || '页面出错');
  }
}

run();
