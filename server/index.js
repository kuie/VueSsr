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
  const loginRegister = require('./api/login&register')
  const start = require('./api/start')
  const data1 = require('./api/data1')

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

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
  app.use(async (ctx, next) => {
    if (/^[\/\\]+api[\/\\]+/.test(ctx.request.url)) {
      next()
    } else if (/asyncData[\/\\]+/.test(ctx.request.url)) {
      next()
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


  app.use(data1.routes(), data1.allowedMethods())
  app.use(index.routes(), index.allowedMethods())
  app.use(loginRegister.routes(), loginRegister.allowedMethods())
  app.use(start.routes(), start.allowedMethods())

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
