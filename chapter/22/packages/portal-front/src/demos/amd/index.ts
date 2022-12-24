/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { CDN_BASE_URL, render, loadMaterialStyle, layout } from '../util';

async function runtime() {
  const paths: Record<string, string> = {};
  layout.materials.forEach((m) => {
    paths[m.name] = `material/${m.name}/${m.version}/index.amd`;
  });

  // @ts-ignore
  window.requirejs.config({
    baseUrl: CDN_BASE_URL,
    paths
  });

  // @ts-ignore
  window.require(
    ['vue', 'require', ...layout.materials.map((m) => m.name)],
    // @ts-ignore
    (Vue: any, require: any) => {
      const moduleMap: any = {};
      for (const m of layout.materials) {
        const { name, version } = m;
        loadMaterialStyle({ name, version });
        moduleMap[name] = require(name);
      }
      render({ Vue, moduleMap, layout });
    }
  );
}

runtime();
