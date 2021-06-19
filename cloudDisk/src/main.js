import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import VueRouter from "vue-router";
import axios from 'axios';

Vue.use(VueRouter)
Vue.use(Element, { size: 'middle', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
