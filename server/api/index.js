'use strict'
const router = require('koa-router')()
const path = require('path')
const util = require('util')
router.prefix(path.format({ root: '/', name: 'api' }))
router.post(path.format({ root: '/', name: 'json' }), async ctx => {
  ctx.response.body = 1;
  ctx.body = { code: 200 }
})
module.exports = router
