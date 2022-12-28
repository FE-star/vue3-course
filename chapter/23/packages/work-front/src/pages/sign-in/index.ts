import { createApp } from 'vue';
import App from './app.vue';
import '@my/components/css/index.css';
import '../../assets/reset.less';

const app = createApp(App);

app.mount('#app');
