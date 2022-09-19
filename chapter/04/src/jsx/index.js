import { createApp } from 'vue';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App);
  app.mount('#app');
})