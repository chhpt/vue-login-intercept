<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 30px;">登录</span>
    </div>
    <el-form :model="formData" :rules="rule" ref="formData" label-width="100px" class="login-form">
      <el-form-item label="Token" prop="token">
        <el-input type="password" v-model="formData.token" auto-complete="off" @keyup.enter.native="submitForm('formData')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import * as Mutations from '../store/mutations'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入Token'))
        } else {
          // 必需
          callback()
        }
      }
      return {
        formData: {
          token: ''
        },
        rule: {
          token: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formData) {
        this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$store.commit(Mutations.LOGIN, this.formData.token)
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            // 编程式导航
            this.$router.push({
              path: redirect
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-form {
    margin: 20px;
    width: 450px;
  }

  .box-card {
    margin: 100px auto;
    width: 600px;
  }
</style>
