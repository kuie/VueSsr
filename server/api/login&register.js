"use strict"
const router = require('koa-router')()
const path = require('path')
const util = require('util')
// const db = require('../DB')
router.prefix(path.format({ root: '/', name: 'api' }))

router.post(path.format({ root: '/', name: 'login' }), async ctx => {
  ctx.body = { code: 200, msg: '登陆成功！' }
})
router.post(path.format({ root: '/', name: 'register' }), async ctx => {
  ctx.body = { code: 200, msg: '注册成功！' }
})
router.post(path.format({ root: '/', name: 'logout' }), async ctx => {
  ctx.body = { code: 200, msg: '退出登录！' }
})
module.exports = router
