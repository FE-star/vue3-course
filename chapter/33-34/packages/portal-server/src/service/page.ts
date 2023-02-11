import type {
  MyAPIResult,
  PageInfo,
  PageHtmlContent,
  PageLayoutData
} from '../types';
import * as pageModel from '../model/page-info';
import { getPageSSRAppContent } from './page-app';

export async function getPageInfo(params: {
  uuid: string;
}): Promise<MyAPIResult> {
  const result: MyAPIResult = {
    data: null,
    success: false,
    message: '查询失败'
  };
  const data = await pageModel.findPageInfoByUuid(params);
  if (data !== null) {
    delete data.id;
    result.data = data;
    result.success = true;
    result.message = '查询数据成功';
  }
  return result;
}

export async function getProdPageContents(params: {
  uuid: string;
  runModule?: string;
}): Promise<PageHtmlContent> {
  const { uuid, runModule } = params;
  const result: PageHtmlContent = {
    injectBefore: '',
    injectAfter: '',
    ssrHtml: '',
    ssrCss: ''
  };
  const data: PageInfo | null = await pageModel.findPageInfoByUuid(params);
  const moduleModes: string[] = ['bundle', 'esm', 'amd'];
  let useMoudle = 'bundle';
  if (typeof runModule === 'string' && moduleModes.includes(runModule)) {
    useMoudle = runModule;
  }

  if (data !== null) {
    const version = data.currentVersion;
    const pageLayoutData: PageLayoutData = JSON.parse(data.layout);
    const ssrHtml = await getPageSSRAppContent({ pageLayoutData });
    const globalScript = `
    <script type="text/javascript">
      (function() {
        window.pageLayoutData = ${data.layout || null};
      })()
    </script>
    `;
    const injectBeforeMap: Record<string, string> = {
      bundle: `
      <script type="importmap">
        {
          "imports": {
            "vue": "/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.esm-browser.js"
          }
        }
      </script>
      <link rel="stylesheet" href="/public/cdn/page/${uuid}/${version}/bundle.css" />
      <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>
      <script src="/public/static/page-helper.js"></script>
      ${globalScript}
      `,
      esm: `
      <script type="importmap">
        {
          "imports": {
            "vue": "/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.esm-browser.js"
          }
        }
      </script>
      <link rel="stylesheet" href="/public/cdn/page/${uuid}/${version}/bundle.css" />
      ${globalScript}
      `,
      amd: `
      <link rel="stylesheet" href="/public/cdn/page/${uuid}/${version}/bundle.css" />
      <script src="/public/cdn/pkg/requirejs/2.3.6/require.js"></script>
      <script src="/public/cdn/pkg/vue/3.2.45/dist/vue.runtime.global.js"></script>
      ${globalScript}
      `
    };
    const injectAfterMap: Record<string, string> = {
      bundle: `<script src="/public/cdn/page/${uuid}/${version}/bundle.js"></script>`,
      esm: '<script src="/public/static/page-esm-runtime.js"></script>',
      amd: '<script src="/public/static/page-amd-runtime.js"></script>'
    };

    result.ssrHtml = ssrHtml;
    result.injectBefore = injectBeforeMap[useMoudle];
    result.injectAfter = injectAfterMap[useMoudle];
  }
  return result;
}
