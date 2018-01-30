const util = require('util')
module.exports = async (ctx, next) => {
  let start = new Date()
  await next()
  util.log(`处理用时: ${ new Date() - start }ms`)
}
