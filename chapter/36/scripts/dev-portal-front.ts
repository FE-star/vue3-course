import { createServer } from 'vite';
import { resolvePackagePath } from './util';
import pluginVue from '@vitejs/plugin-vue';
import pluginVueJsx from '@vitejs/plugin-vue-jsx';

(async () => {
  const server = await createServer({
    configFile: false,
    root: resolvePackagePath('portal-front'),
    plugins: [pluginVue(), pluginVueJsx()],
    server: {
      host: '127.0.0.1',
      port: 6002,
      proxy: {
        '/p': 'http://127.0.0.1:6001/',
        '/page': 'http://127.0.0.1:6001/',
        '/demo': 'http://127.0.0.1:6001/',
        '/public': 'http://127.0.0.1:6001/',
        '/api': 'http://127.0.0.1:6001/'
      }
    }
  });
  await server.listen();
  server.printUrls();
})();
