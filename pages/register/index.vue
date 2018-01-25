<template>
  <div class="register">
    <el-form label-position="left" label-width="100px">
      <el-form-item prop="name" label="用户名">
        <el-input autoComplete="off" name="name" type="text" v-model="name"></el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="请输入密码">
        <el-input autoComplete="off" name="pwd" type="password" v-model="pwd"></el-input>
      </el-form-item>
      <el-form-item prop="repwd" label="再次输入密码">
        <el-input autoComplete="off" name="repwd" type="password" v-model="repwd"></el-input>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱">
        <el-input autoComplete="on" name="mail" type="text" v-model="mail"></el-input>
      </el-form-item>
      <el-form-item prop="tel" label="电话号码">
        <el-input autoComplete="on" name="mail" type="text" v-model="tel"></el-input>
      </el-form-item>
      <el-form-item prop="QQ" label="QQ">
        <el-input autoComplete="off" name="QQ" type="text" v-model="QQ"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm" :loading="submitState">注&nbsp&nbsp&nbsp&nbsp册</el-button>
    <nuxt-link to="/login" class="el-button el-button--success">登&nbsp&nbsp&nbsp&nbsp陆</nuxt-link>
  </div>
</template>

<script>
  'use strict'
  import { register } from '../../API/index'

  export default {
    layout() {
      return 'default'
    },
    name: 'User',
    data() {
      return {
        submitState: false,
        name: '',
        pwd: '',
        repwd: '',
        mail: '',
        tel: '',
        QQ: ''
      }
    },
    methods: {
      submitForm() {
        this.submitState = true
        register(this.name, this.pwd, this.mail, this.tel, this.QQ).then(res => {
          this.$message({
            type: res.code === 200 ? 'success' : 'warning',
            message: res.msg
          })
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.submitState = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .register {
    width: 80%;
    margin: 30px auto;
    .el-button {
      width: 60%;
      display: block;
      margin: 10px auto;
    }
  }
</style>
