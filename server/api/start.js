"use strict";
const router = require('koa-router')();
const path = require('path');
const util = require('util');
router.prefix('/api/start');

router.all('/data', async ctx => {
  util.log(ctx.request.body)
  ctx.body = {
    code: 200,
    msg: '获取成功！',
    data: [
      { color: 'red', val: '红色' },
      { color: '#fff', val: '白色' },
      { color: 'blue', val: '蓝色' }
    ]
  }
});
module.exports = router;
