# vue-login-intercept

> 一个 Vue.js 的小demo

## 介绍
该项目是根据 [一个项目学会前端实现登录拦截](https://github.com/superman66/vue-axios-github) 项目的思想，基于 Element UI 完成一个登录，拦截登录，登出，利用 GitHub API 获取数据等功能的一个小 demo ，利用了 vue，vue-router，vuex，axios，webpack，sass 等技术栈， 通过 eslint 进行语法检查，是 vue 初学者实践的一个很好的例子。

项目分为网页版和桌面版，网页版使用 [vue-webpack](https://github.com/vuejs-templates/webpack) 作为项目模板构建，桌面版使用基于 Electron 和 Vue 的  [electron-vue](https://github.com/SimulatedGREG/electron-vue) 模板构建。

[Electron](https://electron.atom.io/) 是一个能让你通过 JavaScript、HTML 和 CSS 构建桌面应用的框架。这些应用能打包到 Mac、Windows 和 Linux 电脑上运行，当然它们也能上架到 Mac 和 Windows 的 app stores。Electron 结合了 Chromium、Node.js 和用于调用操作系统本地功能的 API（如打开文件窗口、通知、图标等）。基于 Electron 的开发，就好像开发一个网页一样，而且能够无缝地使用 Node。或者说：就好像构建一个 Node app，并通过 HTML 和 CSS 构建界面。另外，你只需为一个浏览器（最新的 Chrome）进行设计，无需考虑兼容性。使用 Electron 可以快速开发桌面端程序，并且兼容性好，可移植性强，是使用前端技术开发桌面端应用程序的很好地选择。


**网页版截图**

![首页截图](http://wx4.sinaimg.cn/large/005AcJpBgy1fhlud1uzgaj30rt0i5407.jpg)
![登录界面](http://img.my.csdn.net/uploads/201707/17/1500302793_4018.png)
![仓库列表](http://wx3.sinaimg.cn/large/005AcJpBgy1fhlud13e2vj30sk0lo42e.jpg)


---

**Electron版截图**

![首页](http://img.my.csdn.net/uploads/201707/17/1500302968_1868.png)
![仓库列表](http://wx4.sinaimg.cn/large/005AcJpBgy1fhn2j30s2mj30r90gt0vt.jpg)
### 技术栈
- [Vue](https://cn.vuejs.org/v2/guide/)
- [vue-router](https://router.vuejs.org/zh-cn/)
- [vuex](https://vuex.vuejs.org/zh-cn/intro.html)
- [axios](https://segmentfault.com/a/1190000008470355#articleHeader7)
- [Element UI](http://element.eleme.io/#/zh-CN/component/installation)
- [Electron](https://electron.atom.io/)


## 构建步骤

``` bash
# 安装依赖
npm install

#在本地服务器上的8080端口启动热加载调试
npm run dev

# 以最小化构建产品
npm run build

# 构建并查看分析器报告
npm run build --report=
```

## 项目结构
> 网页版

```
.
├── README.md
├── build // 构建配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js // 基本的 webpack 配置文件
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package-lock.json
├── package.json
├── src // 源文件
│   ├── App.vue
│   ├── assets // 资源目录
│   │   ├── layout.scss
│   │   └── logo.png
│   ├── components // vue 组件
│   │   ├── index.vue // 主页
│   │   ├── login.vue // 登录
│   │   └── repository.vue // 仓库列表
│   ├── main.js // 入口文件
│   ├── router // 路由
│   │   ├── http.js // axios获取数据
│   │   └── index.js
│   └── store // vuex 状态管理的文件夹
│       ├── index.js
│       └── mutations.js
└── static // 静态资源
```

## 项目逻辑
### 1. 组件
分析项目的目的，我们可以得出以下主要过程：

```bash
登录 -> 验证 -> 获取 GitHub 上的仓库信息 -> 注销
```
由上面的过程，我们可以抽出 3 个组件：首页，登录，仓库列表。`index` 组件显示介绍信息，登录和验证功能在 `login` 组件中完成，获取 GitHub 上的仓库信息并进行展示由 `repository` 组件完成。注销功能全局可见，直接放到导航栏中即可。

### 2. 拦截登录
拦截登录是这个项目的要点，主要分为两步，一是通过路由拦截，二是通过 [`axios` 的拦截器](https://segmentfault.com/a/1190000008470355#articleHeader16)。

#### 路由拦截
在定义 `reposiroty` 组件的路由时需要配置 `meta` 字段，在 `meta` 字段中添加一个属性，用于判断该路由的访问是否需要登录，如果用户已经登录，则顺利进入路由， 否则就重定向到登录页面。

```javascript
meta: {
  requiresAuth: true // 用于判断进入这个路由是否需要认证
}
```

```javascript
// 在每个路由生效之前，先进行一些处理，请参考 vue-router官方文档-导航钩子
router.beforeEach((to, from, next) => {
  // 对 to.matched 数组中的每个路由调用箭头函数
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断登录状态
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
```
`router.beforeEach` 是 vue-router 提供的导航钩子，导航钩子的作用主要用来拦截导航，让它完成跳转或取消。可以使用 `router.beforeEach` 来注册一个全局的 `before` 钩子，当一个导航触发时，全局的 `before` 钩子会被按照创建顺序调用，钩子是异步解析执行，在所有的钩子解析完成之前，导航一直处于等待之中。

**官方文档**：
> 每个钩子方法接收三个参数：

> `to: Route`: 即将要进入的目标路由对象

> `from: Route`: 当前导航正要离开的路由

>`next: Function`: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

> `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

> `next(false)`: 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

> `next('/')` 或者 `next({ path: '/' })`: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

**注意：** 一定要调用 `next` 方法，否则钩子就不会被解析，也就不会起作用。

`to` 和 `from` 是路由信息对象，包含了一些基本属性，其中 `matched` 属性是一个数组，记录了当前路由的所有嵌套路径片段的 **路由记录**。路由记录就是 routes 配置数组中的对象副本（还有在 children 数组）。

```
const router = new VueRouter({
  routes: [
    // 下面的对象就是路由记录
    { path: '/foo', component: Foo,
      children: [
        // 这也是个路由记录
        { path: 'bar', component: Bar }
      ]
    }
  ]
})
```
我们通过对 `matched` 数组调用 `some` 方法，遍历数组，检查所有路由记录的 `meta` 字段中是否有需要登录的标志属性，如果有，就判断是否登录，做进一步处理，否则直接进行路由导航。

#### axios 拦截器
路由拦截只能进行简单的拦截，若用户恶意进行登录，路由拦截并不能起到很好地作用，还需要根据服务器的返回信息进行拦截，这时就需要时使用 axios 的拦截器。

axios 的拦截器（interceptors）可以在 `请求（request）` 或者 `返回（response）` 被 `then` 或者 `catch` 处理之前对他们进行拦截，即可以在正式向服务器发送请求之前和使用 `then` 或者 `catch` 处理服务器的请求之前对信息进行处理。

**部分源代码**

```javascript
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
```
这里使用 ```axios``` 的请求拦截器，在发起请求前判断用户的登录状态（通过 token 信息），如果登录的话则在 ```http header``` 上加上 ```token``` 信息，否则拒绝发送请求。在处理返回的信息时，通过返回的状态码，判断是否为非法登录（401），如果是非法登录，则清除登录信息（本地存储的 ```token``` 信息），重定向到登录界面。

### 3.状态管理（Vuex）
在这个项目里，多个组件（`index` 和 `login`）都需要用到 `token` 信息，也会有多个组件（`login` 和 `repository`）对 `token` 或者 `title` 信息进行更改的情况， 这个时候就涉及到两个问题：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

让我们来看看官方文档的对这种问题的解释：

>对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

>因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

>另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

>这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

通过上面的解释，我们可以看出来，Vuex 能够很好地解决以上问题。

每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你的应用中大部分的状态(state)。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

创建 `store` 的过程很简单，只需要提供一些初始 `state` 对象和一些 `mutations` ：

```javascript
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
```
现在，你可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更

```javascript
store.commit(Mutations.LOGOUT)
console.log(store.state.title)
```

Vuex 主要有几个核心概念：

- State： 状态，也就是数据来源，可以看作是组件中的 `data`，不过是抽离的公共数据。
- Getters：可以理解为 store 的计算属性。
- Mutations：更改 store 中的 state 的方法，类似于事件，每个 mutation 都有一个字符串的`事件类型 (类似于事件的名称)`和一个`回调函数 (handler)`，这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。 mutation 必须是同步函数。
- Actions：Action 类似于 mutation，不过 Action 提交的是 mutation ，而不是直接变更状态，并且 Action 可以包含任何异步操作。
- Modules：Vuex 允许我们将 store 分割成模块，避免当状态较多时， store 对象过于臃肿。

更多关于 Vuex 的内容请看[官方文档](https://vuex.vuejs.org/zh-cn/)

## 项目文件
> 网页版

### `main.js`
`main.js` 文件是 webpack 打包的入口文件，也是 vue 应用程序的入口文件，在这里要完成一些项目所需模块的加载，实例化并挂载 vue。

### `App.vue`
`App.vue`是主要的应用组件，也是最先被加载的组件，可以认为是传统网页中的首页，但是不同的是，其他组件会被加载到 `App.vue` 中的路由视图区 `<router-view></router-view>` 中，也就是说 `App.vue` 中的其他内容并不会消失，而是存在整个应用的生命周期中，所以 `App.vue` 中适合写一些存在于全部页面中的结构，如导航栏。

这里，我在 `App.vue` 中直接写入了导航栏，因为导航栏结构比较简单，如果是比较复杂的结构，还是抽离为单页面组件比较好。

### `router/index.js`
路由的官方介绍：
> 用 Vue.js + vue-router 创建单页应用，是非常简单的。使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 vue-router 添加进来，我们需要做的是，将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。

在这里进行基本的路由配置，将组件映射到路由，使得组件能够被正确的加载并渲染，路由和传统网页中的 `<a href=""></a>` 标签意义比较接近，不过是针对 vue 的组件进行加载，也可以作为传统的标签使用，功能上更加强大。

### `router/http.js`

`http.js` 文件是 axios 的包装文件，包装了 axios 的登录拦截方法，

### `components/`
`components/` 目录下是构成应用的[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)，主要有首页，登录，仓库列表三个组件，会被加载到 `App.vue` 中的路由视图区中。

### `stroe/`
状态管理模式 vuex 的配置文件 `index.js` 和管理 mutation 事件类型的文件 `mutations.js`，`mutations.js` 的作用是：使用常量代替 mutation 事件类型，把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然。


