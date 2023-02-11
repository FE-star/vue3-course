import fs from 'node:fs';
import path from 'node:path';
import type { MyAPIResult, PageStage } from '../types';

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
      html = html.replace(
        '<!--INJECT_AFTER_BODY-->',
        `
        <script type="module" src="/@vite/client"></script>
        <script type="module" src="/src/pages/${pageName}/index.ts"></script>
      `
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

export function getPreviewHTML(
  pageName: string,
  opts?: {
    pageUuid?: string;
    version?: string;
    type?: 'bundle' | 'esm' | 'amd';
    pageResultData: MyAPIResult;
    stage: PageStage;
  }
): string | null {
  let html: string | null = '<h1>404: 页面不存在</h1>';
  const htmlPath = path.join(getServerDir(), 'template', 'preview.html');
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
    const {
      pageUuid = '',
      version = '',
      type = 'bundle',
      pageResultData = {},
      stage
    } = opts || {};
    const pageTypeMap = {
      prod: 'page',
      test: 'page-test',
      pre: 'page-pre'
    };
    const pageType = pageTypeMap[stage || 'test'] || 'page-test';
    let injectMap = {
      bundle: {
        before: `<link href="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.css" rel="stylesheet" />
        <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>`,
        after: `<script src="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.js"></script>`
      },
      esm: {
        before: `<link href="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.css" rel="stylesheet" />`,
        after:
          '<script type="module" src="/public/esm/preview-esm.js"></script>'
      },
      amd: {
        before: `<link href="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.css" rel="stylesheet" />
        <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>`,
        after: '<script src="/public/dist/page/preview-amd.js"></script>'
      }
    };
    if (process.env.NODE_ENV === 'development') {
      injectMap = {
        bundle: {
          before: `<link href="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.css" rel="stylesheet" />
          <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>`,
          after: `<script src="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.js"></script>`
        },
        esm: {
          before: `
          <script type="module" src="/@vite/client"></script>
          <link href="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.css" rel="stylesheet" />`,
          after:
            '<script type="module" src="/public/esm/preview-esm.js"></script>'
        },
        amd: {
          before: `<link href="/public/cdn/${pageType}/${pageUuid}/${version}/bundle.css" rel="stylesheet" />
          <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>`,
          after:
            '<script type="module" src="/src/pages/preview-amd/index.ts"></script>'
        }
      };
    }
    const bodyContent = `
    <script type="text/javascript">
      window.pageResultData = ${JSON.stringify(pageResultData)}
    </script>
    <div id="app">页面加载中...</div>`;
    html = html.replace('<!--INJECT_BODY-->', bodyContent);
    html = html
      .replace(
        '<!--INJECT_BEFORE_BODY-->',
        `
        <title>${pageName}</title>
        ${injectMap[type].before}
      `
      )
      .replace('<!--INJECT_AFTER_BODY-->', injectMap[type].after);
  }
  return html;
}

const PUBLIC_DIR = path.join(getServerDir(), 'public');

export function getPublicFilePath(filePath: string): string {
  const fullPath = path.join(PUBLIC_DIR, filePath);
  return fullPath;
}

export function writePublicFile(filePath: string, text: string) {
  const fullPath = getPublicFilePath(filePath);
  const dirPath = path.dirname(fullPath);
  if (!(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory())) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(fullPath, text);
}

export function readPublicFile(filePath: string): string | null {
  const fullPath = getPublicFilePath(filePath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const text = fs.readFileSync(fullPath, { encoding: 'utf8' });

    return text;
  }
  return null;
}

export function checkExistPublicFile(filePath: string): boolean {
  const fullPath = getPublicFilePath(filePath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return true;
  }
  return false;
}
