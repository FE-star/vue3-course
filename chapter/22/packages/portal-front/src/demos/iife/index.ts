/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import {
  CDN_BASE_URL,
  render,
  loadMaterialStyle,
  layout,
  loadScript
} from '../util';

async function runtime() {
  const moduleMap: any = {};
  for (const item of layout.materials) {
    const { name, version, globalName } = item;
    await loadScript(
      `${CDN_BASE_URL}/material/${name}/${version}/index.iife.js`
    );
    await loadMaterialStyle({ name, version });
    // @ts-ignore
    moduleMap[name] = window[globalName] as any;
  }

  const Vue: any = window.Vue;
  await render({ Vue, moduleMap, layout });
}

runtime();
