"use strict"
const router = require('koa-router')()
const path = require('path')
const util = require('util')
// const db = require('../DB')
router.prefix('/api/user')
// 用户登陆
router.post('/login', async ctx => {
  console.log('收到登陆请求')
  ctx.body = { code: 200, msg: '登陆成功！' }
})
// 用户注册
router.post('/register', async ctx => {
  ctx.body = { code: 200, msg: '注册成功！' }
})
// 用户登出
router.post('/logout', async ctx => {
  ctx.body = { code: 200, msg: '退出登录！' }
})
module.exports = router
