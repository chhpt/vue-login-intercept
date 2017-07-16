/*
* 相关知识请参考 https://router.vuejs.org/zh-cn/
*/
// 导入模块
import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
// @ 为定义的路径解析，表示 src 目录，在 build/webpack.base.config.js 文件中定义
import Index from '@/components/index'
import Login from '@/components/login'
import Repository from '@/components/repository'
import store from '@/store'
import * as Mutations from '@/store/mutations'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/repository',
    name: 'Repository',
    component: Repository,
    meta: {
      requiresAuth: true // 表示进入这个路由需要认证
    }
  }
]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(Mutations.LOGIN, window.localStorage.getItem('token'))
}

// 新建一个路由实例
const router = new Router({
  routes
})

// 在每个路由生效之前，先进行一些处理，请参考 vue-router官方文档-导航钩子
router.beforeEach((to, from, next) => {
  // 对 to.matched 数组中的每个路由调用箭头函数
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 此处需要某个信息判断登录状态
    if (store.state.token) {
      // 继续路由
      next()
    } else {
      // 重定向到登录界面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 继续路由
    next()
  }
})

export default router
