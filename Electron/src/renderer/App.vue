<template>
  <!--导航栏-->
  <div id="app">
    <el-row class="menu">
      <el-col :span="8">
        <!--等同于<router-link to="/">-->
        <router-link :to="{path: '/'}">
          <div class="grid-content">首页</div>
        </router-link>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">{{title}}</div>
      </el-col>
      <el-col :span="8" v-show="token">
        <div class="grid-content"><el-button type="text" @click="logout" class="logout-button">注销</el-button></div>
      </el-col>
    </el-row>
    <!--组件视图区-->
    <router-view></router-view>
  </div>
</template>
<script>
  import * as Mutations from './store/mutations'
  import {mapState} from 'vuex'
  export default {
    name: 'test-demo',
    computed: mapState({
      title: state => state.intercept.title,
      token: state => state.intercept.token
    }),
    methods: {
      logout () {
        this.$store.commit(Mutations.LOGOUT)
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style lang="scss">
  $height: 60px;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  * {
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-decoration: none;
  }

  .menu {
    a {
      color: #fff;
    }
    font-size: 1.2em;
    height: $height;
    line-height: $height;
    color: #fff;
    background-color: #20a0ff;
  }
  .logout-button{
    color: #fff !important;
    font-size: inherit !important;
  }
</style>
