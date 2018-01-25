/* 引入elementUI组件并提示用户出现错误 */
'use strict'

import _axios from 'axios'
import { Message } from 'element-ui'

export function obj2params(obj) {
  let result = ''
  for (let item in obj) {
    result += `&${item}=${encodeURIComponent(obj[item])}`
  }
  return result ? result.slice(1) : result
}

export const post = (url, paramsObj) => {
  return _fetch(url, 'POST', paramsObj)
}

export const get = (url, paramsObj) => {
  return _fetch(url, 'GET', paramsObj)
}

export const _fetch = (url, method, paramsObj) => {
  return fetch(url, {
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
        message: `${url}-->${text}-->${res.status}`,
        duration: 5 * 1000
      })
      return Promise.reject(new Error(`${url}-->${text}-->${res.status}`))
    })
  })
}

/* 仅限asyncData方法调用的基于axios的异步交互方式 */
export const axios = _axios
