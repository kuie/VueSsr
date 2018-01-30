import Koa from 'koa'
import { Builder, Nuxt } from 'nuxt'

const start = async () => {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  /*处理json格式数据*/
  const json = require('koa-json');
  /*错误处理*/
  const onerror = require('koa-onerror');
  /*上传文件*/
  const bodyparser = require('koa-bodyparser');
  /*log打印*/
  const logger = require('koa-logger');

  // API处理
  const index = require('./api/index')
  const start = require('./api/start')
  const user = require('./api/user')

  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  const IO = require('koa-socket')
  const io = new IO()

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  onerror(app);
  /*应用中间件*/
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }));
  app.use(json());
  app.use(logger());

  io.attach(app)
  io.use(async (ctx, next) => {
    let start = new Date()
    await next()
    console.log(`response time: ${ new Date() - start }ms`)
  })
  io.on('emit_method', (ctx, data) => {
    console.log(data)
  })

  // 分辨路由请求和接口请求
  app.use(async (ctx, next) => {
    // post请求及以api开头的请求进入请请处理阶段，否则默认为是页面请求
    if (ctx.request.method === 'POST' || /^([\/\\]+api[\/\\]+)|(socket\.io)/.test(ctx.request.url)) {
      if (/^[\/\\]+socket\.io/.test(ctx.request.url)) {
        console.log('发生socket请求')
        ctx.body = { id: 1154 }
      } else {
        next()
      }
    } else {
      await next()
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    }
  })

  app.use(index.routes(), index.allowedMethods())
  app.use(user.routes(), user.allowedMethods())
  app.use(start.routes(), start.allowedMethods())

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
