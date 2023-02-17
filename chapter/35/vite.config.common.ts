import { defineConfig } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginVueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [pluginVue(), pluginVueJsx()]
});
