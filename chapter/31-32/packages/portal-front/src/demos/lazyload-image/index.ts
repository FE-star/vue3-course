import { createApp } from 'vue';
import App from './app.vue';
import LazyloadPlugin from './lazyload';

const app = createApp(App, {});
app.use(LazyloadPlugin, { container: document.querySelector('body') });
app.mount('#app');
