/*
*  相关知识请参考Vuex官方文档
* */
import Vue from 'vue'
import Vuex from 'vuex'
// 使用常量代替 Mutation 事件类型
import * as Mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: '拦截登录',
    user: 'wuyiqinng',
    token: ''
  },
  mutations: {
    // 使用 ES6 的计算属性
    [Mutations.LOGIN] (state, token) {
      localStorage.token = token
      state.token = token
    },
    [Mutations.LOGOUT] (state) {
      localStorage.removeItem('token')
      state.token = ''
    },
    [Mutations.TITLE] (state, title) {
      state.title = title
    }
  }
})

export default store
