import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



function plugin(Vue,...args){
  console.log('args: ', args);
  // Vue
  Vue.prototype.fz = "fz";
}



Vue.use(plugin,{name:"foundation"},10)
Vue.use(ElementUI);




Vue.config.productionTip = false



const vm =  new Vue({
  render: h => h(App),
}).$mount('#app')
console.log('vm: ', vm);

export default vm
