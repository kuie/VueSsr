# VueSsr

> This is a ssr Vue project power by NUXT

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
#项目备注
目前项目中发送的请求类地址规定为以/api开头请求处理部分再server里面
koa2的语法比express简单一些，主要是上下文对象从原来的res，req变成了ctx一个对象解决全部
项目中没有使用proxyTable的代理模式，只是通过将api请求和页面请求分开
这也意味着地址栏中不会出现XXX/api这样的路径了
定制路由的时候请注意
将axois从util的fetch.js中过一下是为了以后添加接口拦截使用的设置
#项目总结
总体来说项目搭建过程比较顺利
基于NUXT的后台页面渲染使用起来相比vue-router要简便不少
不需要配置路由项，只要完成文件结构的建立系统会自动生成路由系统
中间件的使用也是通过在middleware文件夹中直接添加js就可以了

另外还有↓↓↓↓↓↓↓↓

插件--->plugins

中间件---> middleware

页面--->pages

静态文件---> static

布局--->layouts

组件--->components

乱七八糟的其他资源--->assets

API--->自己加的存放一些API接口，方便查阅修改

util-->我自己加的存放一些公共方法比如filter...selectList啥的总会用到

build--->根据 backpack.config.js文件生成

项目的报错有些尴尬。。。一般出现不明所以的报错请先检查一下asyncDate或者fetch这些服务器异步方法
可能是这些方法出错了导致页面就没有render回来

后台渲染页面在打包后整体运行速度还是不错的
值得一提的是 npm run build后的项目文件并不是非常庞大
打包后的项目在页面显示的过程中也没有再吃出现dev模式下的样式闪动问题
当然，一些常用的样式库可以放在head里作为静态资源使用
通过CDN也是可以提高加载速度的
目前来看，异步交互完全依靠fetch是可行的（但是基于后台获取数据的方式中fetch就是天坑 axios才是正途）

我尝试在koa项目的启动中将NUXT项目打包部署 但是失败了 原因是nuxt是对象...
但是在网上的一些demo中却使用了new nuxt(confg)这种方法 目前还没弄清楚是怎么回事.. 出现问题的demo代码如下
```js
const nuxtConfigFile = resolve(rootDir, 'nuxt.config.js')

let options = {}
if (fs.existsSync(nuxtConfigFile)) {
  options = require(nuxtConfigFile)
}
if (typeof options.rootDir !== 'string') {
  options.rootDir = rootDir
}

const nuxt = new Nuxt(options)
nuxt.build()
```
事实证明
不靠谱文档害死人...
这玩意正确的引入方式是通过结构赋值来的...
```js
import { Nuxt, Builder } from 'nuxt'
```
这才是正确的引入姿势...
后续的使用方法可以详见项目中server/index.js

##项目踩坑实录
1. fetch is not a function与document is not define之谜 毫无疑问基于后台渲染的项目中异步交互不能使用浏览器方法 这也就是问什么我在使用的"document.getElementById('XX')"时候出现了报错 --> document is not define 因为这个时候浏览器对象还没有生成呢...
  asyncData中执行的代码都是不能使用window方法的 任何方法都不行...（fetch同学...就此告别，不送）再util里面有fetch方法的数据拆解可以看看...
2. 莫名其妙的报错 可能是因为引入了代码检查工具的原因 我的代码总会报错 报错的内容还都是因为少了空格多了分号之类的... 
    这也让我重新学习了一把webstorm的基础设置
   Settings-->Editor-->Code Style-->Javascript 可以调整代码格式化(Shift+Ctrl+l)的方法 简单的调整之后报错就少多了 再有就是不能使用双引号而使用单引号 行尾不能有;的问题了 通常在Settings-->Editor-->Live Templates下可以更改一下也是可以的
3. server/index.js
  
