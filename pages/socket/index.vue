<template>
  <div>
    <el-input v-model="msg"></el-input>
    <el-button type="primary" @click="send">发送</el-button>
    <div>这是ID-->{{id}}</div>
  </div>
</template>

<script>
  'use strict'
  export default {
    data() {
      return {
        msg: '',
        List: [],
        id: ''
      }
    },
    sockets: {
      connect() {
        console.log('socket链接成功 id:' + this.$socket.id)
        this.id = this.$socket.id
      },
      customEmit() {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      },
      broadcast(val) {
        console.log(val)
      }
    },
    methods: {
      send() {
        console.log(this.msg)
        // let socket = io('http://localhost:3000/some')
        // socket.on('msg', data => {
        //   socket.emit('msg', { rp: 'fine,thank you' })
        //   console.log(data)
        // })
        this.$socket.emit('join', this.msg)
        this.$options.sockets.msg = (data) => {
          console.log(data)
        }
      }
    }
  }
</script>

<style scoped>

</style>
