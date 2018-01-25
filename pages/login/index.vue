<template>
  <div class="login">
    <el-form label-position="left" label-width="100px">
      <el-form-item prop="name" label="用户名：">
        <el-input autoComplete="off" name="name" type="text" v-model="name"></el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="密码:">
        <el-input autoComplete="off" name="pwd" type="password" v-model="pwd"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm" :loading="submitState">登陆</el-button>
    <nuxt-link to="/register" class="el-button el-button--success">注册</nuxt-link>
  </div>
</template>

<script>
  'use strict'
  import { login } from '../../API/index'

  export default {
    layout() {
      return 'default'
    },
    name: 'User',
    data() {
      return {
        submitState: false,
        name: '',
        pwd: ''
      }
    },
    methods: {
      submitForm() {
        this.submitState = true
        login(this.name, this.pwd)
          .then(res => {
            this.$message({
              type: res.code === 200 ? 'success' : 'warning',
              message: res.msg
            })
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.submitState = false
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    width: 80%;
    margin: 30px auto;
    .el-button {
      width: 60%;
      display: block;
      margin: 10px auto;
    }
  }
</style>
