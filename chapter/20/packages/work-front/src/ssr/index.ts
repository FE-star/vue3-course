import fs from 'node:fs';
import path from 'node:path';
import type { Component } from 'vue';

const pageConfig: { [name: string]: string } = {
  home: './pages/home/index',
  login: './pages/home/index'
};

export const getPageSSRData = async (pageName: string) => {
  const data: { Page: Component | null; css: string } = {
    Page: null,
    css: ''
  };
  if (pageConfig[pageName]) {
    try {
      const jsPath = path.join(__dirname, `${pageConfig[pageName]}.js`);
      const cssPath = path.join(__dirname, `${pageConfig[pageName]}.css`);
      if (fs.existsSync(jsPath) && fs.statSync(jsPath)) {
        data.Page = await import(pageConfig[pageName]);
      }
      if (fs.existsSync(cssPath) && fs.statSync(cssPath)) {
        data.css = fs.readFileSync(cssPath, { encoding: 'utf8' });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  return data;
};
