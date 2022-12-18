import fs from 'node:fs';
import path from 'node:path';

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
