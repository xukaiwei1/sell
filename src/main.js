// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import http from './common/http'
import storage  from './common/cache'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/main.css'
import utilDialog from '../static/js/utilDialog.js';
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.prototype.$storage = storage
Vue.prototype.$utilDialog=utilDialog;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
