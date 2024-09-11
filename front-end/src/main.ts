import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initRem } from './tools/rem';

import App from './App.vue';
import router from './router';

// reset css
import 'modern-normalize';

// element-plus css
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

// 启用 Rem
initRem();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
