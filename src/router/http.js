/*
* 相关知识请参考axios文档 https://segmentfault.com/a/1190000008470355#articleHeader16
* */
import axios from 'axios'
import store from '@/store/'
import * as Mutations from '@/store/mutations'
import router from '@/router/'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://api.github.com'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 返回拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(Mutations.LOGOUT)
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)
  })

export default axios
