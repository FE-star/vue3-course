import { createApp } from 'vue';
import ProductList from './src/index';

const app = createApp(ProductList, {
  width: 600,
  height: 200,
  banners: [
    {
      text: '这是第1个轮播内容',
      background: '#66ded3',
      link: 'https://vuejs.org'
    },
    {
      text: '这是第2个轮播内容',
      background: '#f5a991'
    }
  ]
});

app.mount('#app');
