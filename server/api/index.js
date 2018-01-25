'use strict'
const router = require('koa-router')()
const path = require('path')
const util = require('util')
router.prefix('/api')
router.get('/', async ctx => {
  ctx.body = '测试'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/json', async ctx => {
  ctx.response.body = 1;
  ctx.body = { code: 200 }
})
module.exports = router
