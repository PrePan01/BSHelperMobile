import Vue from 'vue'
import App from './App.vue'

import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';

NutUI.install(Vue);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
