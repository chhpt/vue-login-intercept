import Vue from 'vue'
import axios from './router/http'
// 样式文件需要单独导入
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

// 使用ElementUI插件
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
