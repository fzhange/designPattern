import Vue from 'vue';
import App from './App.vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(PiniaVuePlugin);
Vue.use(ElementUI);
const pinia = createPinia();

import './assets/main.css';

new Vue({
  pinia,
  render: (h) => h(App),
}).$mount('#app');
