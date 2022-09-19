import { createApp } from 'vue';
import App from './app';
import './app.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App);
  app.mount('#app');
})