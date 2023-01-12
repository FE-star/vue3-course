/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
async function run() {
  const asyncModules = {
    vue: 'Vue',
    '@my/material-banner-slides': 'MaterialBannerSlides',
    '@my/material-product-list': 'MaterialProductList'
  };
  const names = Object.keys(asyncModules);
  for (const name of names) {
    const Mod = await import(name);
    // @ts-ignore
    window[asyncModules[name]] = Mod.default || Mod;
  }
  // @ts-ignore
  await import('./page-run-app.js');
}

run();
