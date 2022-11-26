import { createServer } from 'vite';
import { resolvePackagePath } from './util';
import pluginVue from '@vitejs/plugin-vue';
import pluginVueJsx from '@vitejs/plugin-vue-jsx';

(async () => {
  const server = await createServer({
    configFile: false,
    root: resolvePackagePath('work-front'),
    plugins: [pluginVue(), pluginVueJsx()],
    server: {
      port: 8002,
      proxy: {
        '/page': 'http://127.0.0.1:8001/',
        '/api': 'http://127.0.0.1:8001/'
      }
    }
  });
  await server.listen();
  server.printUrls();
})();
