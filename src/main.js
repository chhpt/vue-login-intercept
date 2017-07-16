// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

// 样式文件需要单独导入
import 'element-ui/lib/theme-default/index.css'
import store from './store'
import axios from './router/http'

Vue.config.productionTip = false

// 使用ElementUI插件
Vue.use(ElementUI)

// 将 axios 挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件，既可以通过this.$store访问
  store,
  template: '<App/>',
  components: { App }
})
