<template>
  <!--设置加载动画 v-loading.fullscreen.lock-->
  <div class="container" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="24" v-for="repo in list" :key="repo.name">
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div slot="header" class="header clearfix">
            <!--仓库名-->
            <span class="repo-name">{{repo.name}}</span>
            <!--仓库语言-->
            <span v-if="repo.language" class="repo-lang">
              <div class="round"></div>
              <span>{{repo.language}}</span>
            </span>
          </div>
          <div class="card-content">
            <!--仓库描述-->
            <span v-if="repo.description">
              <span><b>Description:</b> &nbsp {{repo.description}}</span>
            </span>
            <span v-if="!repo.description">
              <span><b>Description:</b> &nbsp 无</span>
            </span>
            <!--其他-->
            <span v-if="repo.stargazers_count">
              <span>{{repo.stargazers_count}}</span>
            </span>
            <span v-if="repo.forks_count">
              <span>{{repo.forks_count}}</span>
            </span>
          </div>
          <!--拥有者头像-->
          <img :src="repo.owner.avatar_url" class="image clearfix">
          <div class="bottom clearfix">
            <span v-if="repo.updated_at">
              <span><b>Last updated:</b> &nbsp {{repo.updated_at}}</span>
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Mutations from '../store/mutations'

  export default {
    name: 'res',
    data () {
      return {
        msg: '',
        list: [],
        loading: false
      }
    },
    mounted () {
      this.$store.commit(Mutations.TITLE, 'Your Repositories')
      this.getRepository()
    },
    // 更改颜色的函数依赖于重新渲染后的DOM，所以用 updated 钩子
    updated () {
      this.changeColor()
    },
    methods: {
      getRepository () {
        let params = {
          sort: 'updated'
        }
        // 设置加载动画
        this.loading = true
        // 使用axios获取数据
        this.axios.get('/user/repos', params)
          .then(response => {
            this.list = response.data
            this.loading = false
          })
          .catch(error => {
            // 处理错误，显示错误信息
            this.loading = false
            this.$message.error(error.message)
          })
      },
      // 随机生成语言前的圆的背景颜色
      changeColor () {
        const colorList = ['#f1e05a', '#e34c26', '#3fb68b', '#438eff', '#b07219']
        let rounds = document.getElementsByClassName('round')
        for (let i = 0; i < rounds.length; i++) {
          let randomIndex = parseInt(Math.random() * 5)
          console.log(randomIndex)
          rounds[i].style.backgroundColor = colorList[randomIndex]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/layout";
</style>
