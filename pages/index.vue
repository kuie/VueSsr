<template>
  <div class="hello">
    <div class="loadingBox" v-if="loading">
      <div>{{name}}</div>

      <svg viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="25" :fill="Color" fill-opacity=".2"></circle>
        <circle class="path" cx="50" cy="50" r="20" :fill="Color" fill-opacity=".2"></circle>
        <circle class="path" cx="50" cy="50" r="15" :fill="Color" fill-opacity=".2"></circle>
        <circle class="path" cx="50" cy="50" r=10 :fill="Color" fill-opacity=".2"></circle>
        <circle class="path" cx="50" cy="50" r="5" :fill="Color" fill-opacity=".2"></circle>
      </svg>
      <h2 :style="`color:${Color}`" class="loadingBox">Loading...</h2>
      <el-button type="primary" @click="skipAD">跳过广告</el-button>
    </div>
    <div v-else>
      <nuxt-link to="/login" class="el-button el-button--primary">登陆</nuxt-link>
      <nuxt-link to="/register" class="el-button el-button--success">注册</nuxt-link>
      <nuxt-link to="/start" class="el-button el-button--success">start</nuxt-link>
      <nuxt-link :to="{path:'/user/123223'}" class="el-button el-button--success">user/:id</nuxt-link>
      <el-button type="primary" @click="submit">提交测试</el-button>
    </div>
  </div>
</template>
<script>
  'use strict'
  import { axios, post } from '../util/fetch'

  export default {
    name: 'start',
    asyncData() {
      return axios.get('/api/json').then(res => {
        return { Color: 'rgb(0,255,255)', loading: true, name: '成功了' }
      }).catch(err => {
        console.log(err)
        return { Color: 'rgb(255,0,0)', loading: true, name: '失败了' }
      })
    },
    methods: {
      submit() {
        post('/api/json', { a: 1, b: 2 }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      getCircleColors() {
        function getNum() {
          return Math.floor(Math.random() * 256)
        }

        this.Color = `rgb(${getNum()},${getNum()},${getNum()})`
      },
      skipAD() {
        this.loading = false
      }
    },
    created() {
      /**
       * 开始加载计时器
       * */
      let loadingInt = setInterval(this.getCircleColors, 800)
      /**
       * 停止加载计时器
       * */
      let t = setTimeout(() => {
        clearInterval(loadingInt)
        clearTimeout(t)
        t = loadingInt = null
        this.loading = false
      }, 5000)
    }
  }
</script>

<style scoped lang="less">
  .hello {
    height: 100%;
    width: 100%;
    position: relative;
    border: 1px solid #eee;
  }

  h2 {
    text-align: center;
  }

  .el-button {
    color: #fff;
    margin: 10px auto;
    width: 75%;
    display: block;
  }
</style>
