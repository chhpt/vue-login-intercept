import * as Mutations from '../mutations'
const state = {
  title: '拦截登录',
  user: 'wuyiqinng',
  token: ''
}

const mutations = {
  // 使用 ES6 的计算属性
  [Mutations.LOGIN] (state, token) {
    console.log(token)
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

export default {
  state,
  mutations
}
