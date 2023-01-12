import { createServer } from 'vite';
import { resolvePackagePath } from './util';
import pluginVue from '@vitejs/plugin-vue';
import pluginVueJsx from '@vitejs/plugin-vue-jsx';

(async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: resolvePackagePath('business'),
    plugins: [pluginVue(), pluginVueJsx()],
    server: {
      port: 8080
    }
  });
  await server.listen();

  server.printUrls();
})();
