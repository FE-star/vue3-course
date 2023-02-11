export const CDN_BASE_URL = '/public/cdn/';

export interface LayoutConfig {
  materials: Array<{
    name: string;
    globalName: string;
    version: string;
    props: Record<string, any>;
  }>;
}

export const layout: LayoutConfig = {
  materials: [
    {
      name: '@my/material-banner-slides',
      version: '0.1.0',
      globalName: 'MyMaterialBannerSlides',
      props: {
        style: { height: 100 }
      }
    },
    {
      name: '@my/material-product-list',
      version: '0.1.0',
      globalName: 'MyMaterialProdcutList',
      props: {}
    }
  ]
};

export async function loadMaterialStyle(params: {
  name: string;
  version: string;
}) {
  const { name, version } = params;
  const materialId = `${name}/${version}`;
  if (
    document.querySelectorAll(`style[data-material-id="${materialId}"]`)
      ?.length > 0
  ) {
    return;
  }
  const url = `${CDN_BASE_URL}/material/${name}/${version}/index.css`;
  const text = await fetch(url).then((res) => res.text());
  const style = document.createElement('style');
  style.setAttribute('data-material-id', materialId);
  style.innerHTML = text;
  const head =
    document.querySelector('head') ||
    document.querySelector('body') ||
    document.querySelector('html');

  head?.appendChild(style);
}

export function loadScript(url: string): Promise<void> {
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

export async function render(opts: {
  Vue: any;
  moduleMap: { [id: string]: any | { default: any } };
  layout: LayoutConfig;
}) {
  const { moduleMap, layout, Vue } = opts;
  const { h, createApp } = Vue;
  const children = layout.materials.map((item: any) => {
    return h(
      moduleMap[item.name]?.default || moduleMap[item.name],
      item?.props || {}
    );
  });
  const App = {
    setup() {
      return () => {
        return h('div', {}, children);
      };
    }
  };

  const app = createApp({
    render() {
      return h(App, {});
    }
  });
  app.mount('#app');
}
