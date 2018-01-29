require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);



const start = async () => {
  const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;

  /*处理json格式数据*/
  const json = __webpack_require__(6);
  /*错误处理*/
  const onerror = __webpack_require__(7);
  /*上传文件*/
  const bodyparser = __webpack_require__(8);
  /*log打印*/
  const logger = __webpack_require__(9);

  // API处理
  const index = __webpack_require__(10);
  const start = __webpack_require__(11);
  const user = __webpack_require__(12);

  // Import and Set Nuxt.js options
  let config = __webpack_require__(13);
  config.dev = !(app.env === 'production');

  // Instantiate nuxt.js
  const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

  // Build in development
  if (config.dev) {
    const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
    await builder.build();
  }
  onerror(app);
  /*应用中间件*/
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }));
  app.use(json());
  app.use(logger());
  // 分辨路由请求和接口请求
  app.use(async (ctx, next) => {
    // post请求及以api开头的请求进入请请处理阶段，否则默认为是页面请求
    if (ctx.request.method === 'POST' || /^[\/\\]+api[\/\\]+/.test(ctx.request.url)) {
      next();
    } else {
      await next();
      ctx.status = 200; // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve);
        ctx.res.on('finish', resolve);
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject);
        });
      });
    }
  });

  app.use(index.routes(), index.allowedMethods());
  app.use(user.routes(), user.allowedMethods());
  app.use(start.routes(), start.allowedMethods());

  app.listen(port, host);
  console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
};

start();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa-json");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-onerror");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const router = __webpack_require__(0)();
const path = __webpack_require__(1);
const util = __webpack_require__(2);
router.prefix(path.format({ root: '/', name: 'api' }));
router.post(path.format({ root: '/', name: 'json' }), async ctx => {
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
  };
});
router.post('/asyncData', async ctx => {
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
  };
});
module.exports = router;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const router = __webpack_require__(0)();
const path = __webpack_require__(1);
const util = __webpack_require__(2);
router.prefix(path.format({ root: '/api', name: 'start' }));
router.all(path.format({ root: '/', name: 'data' }), async ctx => {
  ctx.body = {
    code: 200,
    msg: '获取成功！',
    data: [{ color: 'red', val: '红色' }, { color: '#fff', val: '白色' }, { color: 'blue', val: '蓝色' }]
  };
});
module.exports = router;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const router = __webpack_require__(0)();
const path = __webpack_require__(1);
const util = __webpack_require__(2);
// const db = require('../DB')
router.prefix(path.format({ root: '/', name: 'api' }));
// 用户登陆
router.post('/login', async ctx => {
  console.log('收到登陆请求');
  ctx.body = { code: 200, msg: '登陆成功！' };
});
// 用户注册
router.post(path.join('/register'), async ctx => {
  ctx.body = { code: 200, msg: '注册成功！' };
});
// 用户登出
router.post(path.join('/logout'), async ctx => {
  ctx.body = { code: 200, msg: '退出登录！' };
});
module.exports = router;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page+
  */
  head: {
    title: 'NUXT',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.bootcss.com/element-ui/2.0.10/theme-chalk/index.css' }]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#cf4507' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    loaders: [{
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash].[ext]'
      }
    }],
    vendor: ['axios']
  },
  plugins: [{ src: '~plugins/vue-ElementUI', ssr: false }],
  cache: true
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map