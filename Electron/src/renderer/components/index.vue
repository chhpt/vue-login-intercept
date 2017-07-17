<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">介绍</span>
    </div>
    <div class="text">
      <span>该项目是根据</span> <a href="https://github.com/superman66/vue-axios-github" target="_blank">一个项目学会前端实现登录拦截</a>
      项目的思想，基于Element UI完成一个登录，拦截登录，登出，利用GitHub API获取数据等功能的一个小demo，利用了vue，vue-router，vuex，axios，webpack，sass等技术栈，
      通过eslint语法检查。
    </div>
    <div class="bottom clearfix">
      <router-link :to="{path: '/repository'}">
        <el-button>查看你的Repository</el-button>
      </router-link>
      <a href="https://github.com/settings/tokens/new" target="_blank">
        <el-button>生成Token</el-button>
      </a>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'Index'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text {
    font-size: 18px;
    text-align: justify;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: 20px auto;
    width: 480px;
  }

  .bottom {
    margin-top: 20px;
  }
</style>
