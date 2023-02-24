import { defineConfig } from 'vitest/config';
import PluginVue from '@vitejs/plugin-vue';
import PluginJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [PluginVue(), PluginJsx()],
  test: {
    globals: true,
    testTimeout: 60 * 1000,
    hookTimeout: 60 * 1000,
    environment: 'jsdom',
    include: ['packages/*/__tests__/**/*.test.{tsx,ts}'],
    coverage: {
      // 覆盖率统计工具
      provider: 'c8',
      // 覆盖率的分母，packages/ 目录里
      // 所有src的源文件作为覆盖率统计的分母
      include: ['packages/*/src/**/*'],
      // 全量覆盖率计算
      all: true
    }
  },
  benchmark: {
    globals: true,
    testTimeout: 60 * 1000,
    hookTimeout: 60 * 1000,
    include: ['packages/*/__tests__/**/*.{test}.{tsx,ts}']
  }
});
