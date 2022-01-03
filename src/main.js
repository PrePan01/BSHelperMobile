import Vue from 'vue'
import App from './App.vue'
//引入AntDesign组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//引入ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入路由
import VueRouter from 'vue-router'
import router from "./router"

import axios from "axios";

Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})


