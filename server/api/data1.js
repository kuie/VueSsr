'use strict'
const router = require('koa-router')()
const path = require('path')
const util = require('util')
router.prefix(path.format({ root: '/', name: 'api' }))
router.get(path.format({ root: '/', name: 'data1' }), async ctx => {
  console.log(123)
  ctx.body = { name: 1231 }
})
module.exports = router
