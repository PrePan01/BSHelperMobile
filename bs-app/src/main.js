import Vue from 'vue'
import App from './App.vue'
//Vant组件库
import Vant from 'vant';
import { Notify } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import 'vant/lib/index.css';
//AntDesign组件库
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//路由
import VueRouter from 'vue-router'
import router from './router'

Vue.use(Vant);
Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(Notify);
Vue.use(Toast);
Vue.use(Popup);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})
