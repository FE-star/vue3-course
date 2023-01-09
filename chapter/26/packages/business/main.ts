import { createApp } from 'vue';
import Example from './examples/drag.vue';
import '@my/components/css/index.css';
import './src/index.less';

const app = createApp(Example);

app.mount(document.querySelector('#app') as HTMLDivElement);
