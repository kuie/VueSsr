/* 引入elementUI组件并提示用户出现错误 */
'use strict'
import path from 'path'
import _axios from 'axios'
import { Message } from 'element-ui'

const pathReturn = url => path.join(...url.split('/'))

const obj2params = obj => {
  let result = ''
  for (let item in obj) {
    result += `&${item}=${encodeURIComponent(obj[item])}`
  }
  return result ? result.slice(1) : result
}

export const post = (url, paramsObj) => {
  return _fetch(pathReturn(url), 'POST', paramsObj)
}

export const get = (url, paramsObj) => {
  return _fetch(pathReturn(url), 'GET', paramsObj)
}

export const _fetch = (url, method, paramsObj) => {
  return fetch(pathReturn(url), {
    method: method,
    /* 携带cookie */
    credentials: 'include',
    headers: {
      'Accept': 'appliaction/json,text/plain,*/*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: obj2params(paramsObj)
  }).then(res => {
    if (res.status === 200) return res.json()
    res.text().then(text => {
      Message({
        type: 'error',
        message: `${pathReturn(url)}-->${text}-->${res.status}`,
        duration: 5 * 1000
      })
      return Promise.reject(new Error(`${pathReturn(url)}-->${text}-->${res.status}`))
    })
  })
}

/* 仅限asyncData方法调用的基于axios的异步交互方式 */
_axios.defaults.timeout = 5000
_axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
export const axios = {
  post(url, data) {
    return _axios({
      method: 'post',
      url: pathReturn(url),
      data: data,
      proxy: {
        host: '127.0.0.1',
        port: 3000
      }
    })
  },
  get(url, data) {
    return _axios({
      method: 'get',
      url: pathReturn(url),
      data: data,
      proxy: {
        host: '127.0.0.1',
        port: 3000
      }
    })
  },
  all(array) {
    return _axios.all(array)
  },
  spread(array) {
    return _axios.spread(array)
  }
}
