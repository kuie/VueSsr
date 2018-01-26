'use strict'
const router = require('koa-router')()
const path = require('path')
const util = require('util')
router.prefix(path.format({ root: '/', name: 'api' }))
router.all(path.format({ root: '/', name: 'json' }), async ctx => {
  ctx.body = {
    code: 200,
    data: {
      name: 'zp+field',
      Color: 'rab(33,33,33)',
      loading: true
    },
    name: 'zp+field',
    Color: 'rab(33,33,33)',
    loading: true
  }
})
module.exports = router
