import { createApp } from 'vue';
import Example from './examples/gird.vue';
// import Example from './examples/layout.vue';
import './src/index.less';

const app = createApp(Example);

app.mount(document.querySelector('#app') as HTMLDivElement);
