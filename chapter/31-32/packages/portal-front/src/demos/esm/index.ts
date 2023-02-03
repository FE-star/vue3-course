/* eslint-disable no-console */
import { CDN_BASE_URL, render, loadMaterialStyle, layout } from '../util';

async function loadMaterialESModule(params: { name: string; version: string }) {
  const { name, version } = params;
  return import(
    /* @vite-ignore */
    `${CDN_BASE_URL}material/${name}/${version}/index.esm.js`
  );
}

async function loadESModule(name: string) {
  return import(
    /* @vite-ignore */
    `${name}`
  );
}

async function runtime() {
  const moduleMap: any = {};
  for (const item of layout.materials) {
    const { name, version } = item;
    const Module = await loadMaterialESModule({
      name,
      version
    });
    await loadMaterialStyle({ name, version });
    moduleMap[name] = Module;
  }

  const Vue: any = await loadESModule('vue');
  await render({ Vue, moduleMap, layout });
}

runtime();
