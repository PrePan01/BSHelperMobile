import Vue from 'vue'
import App from './App.vue'
//Vant组件库
import Vant from 'vant';
import { Notify } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
//AntDesign组件库
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//路由
import VueRouter from 'vue-router'
import router from './router'
import './assets/fonts/fonts.css'
//过滤器
import * as mapTranslate from './filters/mapTranslate'
import * as brawlersName from './filters/brawlersName'

Object.keys(mapTranslate).forEach(key => {
  Vue.filter(key, mapTranslate[key])
})
Object.keys(brawlersName).forEach(key => {
  Vue.filter(key, brawlersName[key])
})

Vue.use(Vant);
Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(Notify);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})
