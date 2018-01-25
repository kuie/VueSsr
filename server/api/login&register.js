"use strict";
const router = require('koa-router')();
const path = require('path');
const util = require('util');
// const db = require('../DB')
router.prefix('/api');

router.post('/login', async ctx => {
  ctx.body = { code: 200, msg: '登陆成功！' }
});
router.post('/register', async ctx => {
  ctx.body = { code: 200, msg: '注册成功！' }
});
router.post('/logout', async ctx => {
  ctx.body = { code: 200, msg: '退出登录！' }
});
module.exports = router;
