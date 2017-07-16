# vue-login-intercept

> 一个 Vue.js 的小demo

## 介绍
该项目是根据 [一个项目学会前端实现登录拦截](https://github.com/superman66/vue-axios-github) 项目的思想，基于 Element UI 完成一个登录，拦截登录，登出，利用 GitHub API 获取数据等功能的一个小 demo ，利用了 vue，vue-router，vuex，axios，webpack，sass 等技术栈， 通过 eslint 进行语法检查，是 vue 初学者实践的一个很好的例子。

![](http://wx4.sinaimg.cn/large/005AcJpBgy1fhlud1uzgaj30rt0i5407.jpg)
![](http://wx2.sinaimg.cn/large/005AcJpBgy1fhlud0b8lhj30gl072747.jpg)
![](http://wx3.sinaimg.cn/large/005AcJpBgy1fhlud13e2vj30sk0lo42e.jpg)


### 技术栈
- [Vue](https://cn.vuejs.org/v2/guide/) 
- [vue-router](https://router.vuejs.org/zh-cn/)
- [vuex](https://vuex.vuejs.org/zh-cn/intro.html)
- [axios](https://segmentfault.com/a/1190000008470355#articleHeader7)
- [Element UI](http://element.eleme.io/#/zh-CN/component/installation)


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

此项目是使用的是 vue 的官方模板 [vue-webpack](https://github.com/vuejs-templates/webpack)作为基本的项目结构。

**vue-webpack 使用方法：**

```bash
# 全局安装 vue-cli 脚手架
npm install -g vue-cli

# 使用 vue-webpack 初始化项目
vue init webpack vue-test
cd vue-test

# 安装依赖的模块
npm install

# 运行调试
npm run dev
```

![](http://wx3.sinaimg.cn/large/005AcJpBgy1fhluczxzjpj30g90bxtdb.jpg)


**目录结构说明**

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

## 项目文件

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


