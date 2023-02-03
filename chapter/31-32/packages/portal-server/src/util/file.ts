import fs from 'node:fs';
import path from 'node:path';
import { readFileFromCDN } from '@my/mock-cdn';
import type { PageHtmlContent } from '../types';

export function getServerDir() {
  return path.join(__dirname, '..');
}

export function getPageHTML(
  pageName: string,
  opts?: { ssrHtml?: string; ssrCss?: string }
): string | null {
  let html: string | null = '<h1>404: 页面不存在</h1>';
  const htmlPath = path.join(getServerDir(), 'template', 'page.html');
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
    const bodyContent = `
    <div id="app">
      ${opts?.ssrCss ? `<style>${opts?.ssrCss}</style>` : ''}
      ${opts?.ssrHtml || ''}
    </div>`;
    html = html.replace('<!--INJECT_BODY-->', bodyContent);

    if (process.env.NODE_ENV === 'development') {
      html = html
        .replace(
          '<!--INJECT_AFTER_BODY-->',
          `
        <script type="module" src="/src/pages/${pageName}/index.ts"></script>
      `
        )
        .replace(
          '<!--INJECT_BEFORE_BODY-->',
          '<script type="module" src="/@vite/client"></script>'
        );
    } else {
      html = html
        .replace(
          '<!--INJECT_BEFORE_BODY-->',
          `
        <link href="/public/dist/page/${pageName}.css" rel="stylesheet" />
        <script src="/public/dist/lib/vue.js"></script>
        <script src="/public/dist/lib/vue-router.js"></script>
      `
        )
        .replace(
          '<!--INJECT_AFTER_BODY-->',
          `
        <script src="/public/dist/page/${pageName}.js"></script>
      `
        );
    }
  }
  return html;
}

export function getDemoHTML(demoName: string): string | null {
  let html: string | null = '<h1>404: 页面不存在</h1>';
  const runtimMap: Record<string, string> = {
    esm: `<script type="importmap">
    {
      "imports": {
        "vue": "/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.esm-browser.js",
        "vue-router": "/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.esm-browser.js"
      }
    }
  </script>`,
    amd: `
    <script src="/public/cdn/pkg/requirejs/2.3.6/require.js"></script>
    <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>
    <script> define("vue", [], function() { return window.Vue; }) </script>
    `,
    iife: '<script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>'
  };
  const htmlPath = path.join(getServerDir(), 'template', 'demo.html');
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
    const bodyContent = '<div id="app"></div>';
    html = html.replace('<!--INJECT_BODY-->', bodyContent);

    if (process.env.NODE_ENV === 'development') {
      html = html
        .replace(
          '<!--INJECT_BEFORE_BODY-->',
          `${runtimMap[demoName] || ''}
          <script type="module" src="/@vite/client"></script>`
        )
        .replace(
          '<!--INJECT_AFTER_BODY-->',
          `<script type="module" src="/src/demos/${demoName}/index.ts"></script>`
        );
    } else {
      html = html
        .replace(
          '<!--INJECT_BEFORE_BODY-->',
          `
        <link href="/public/dist/demo/${demoName}.css" rel="stylesheet" />
        <script src="/public/dist/lib/vue.js"></script>
        <script src="/public/dist/lib/vue-router.js"></script>
      `
        )
        .replace(
          '<!--INJECT_AFTER_BODY-->',
          `
        <script src="/public/dist/demo/${demoName}.js"></script>
      `
        );
    }
  }
  return html;
}

const PUBLIC_DIR = path.join(getServerDir(), 'public');

export function writePublicFile(filePath: string, text: string) {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  const dirPath = path.dirname(fullPath);
  if (!(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory())) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}

export function checkPublicFile(filePath: string): boolean {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return true;
  }
  return false;
}

export function getProdPageHTML(opts?: PageHtmlContent): string | null {
  let html: string | null = '<h1>404: 页面不存在</h1>';
  const htmlPath = path.join(getServerDir(), 'template', 'page.html');
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
    const bodyContent = `
    ${opts?.ssrCss ? `<style>${opts?.ssrCss}</style>` : ''}
    <div id="app">
      ${opts?.ssrHtml || ''}
    </div>`;
    html = html.replace('<!--INJECT_BODY-->', bodyContent);

    html = html
      .replace('<!--INJECT_BEFORE_BODY-->', `${opts?.injectBefore || ''}`)
      .replace('<!--INJECT_AFTER_BODY-->', `${opts?.injectAfter || ''}`);
  }
  return html;
}

export async function getMaterialCjsFilePath(params: {
  name: string;
  version: string;
}): Promise<string> {
  const { name, version } = params;
  const pageBasePath = `material/${name}/${version}/index.cjs.js`;
  const localCDNPath = path.join('cdn', pageBasePath);
  const hasLocalFile = checkPublicFile(localCDNPath);
  if (hasLocalFile === false) {
    const text: string | null = await readFileFromCDN(pageBasePath);
    if (text) {
      writePublicFile(localCDNPath, text);
    }
  }
  const projectPath = getServerDir();
  const publicFilePath = path.join(projectPath, 'public', localCDNPath);
  return publicFilePath;
}
