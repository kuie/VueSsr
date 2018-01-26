"use strict";
const router = require('koa-router')();
const path = require('path');
const util = require('util');
router.prefix(path.format({ root: '/api', name: 'start' }));
router.all(path.format({ root: '/', name: 'data' }), async ctx => {
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
