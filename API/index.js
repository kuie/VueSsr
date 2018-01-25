'use strict'
import { post } from '../util/fetch'
// 登陆
export const login = (username, pwd) => {
  return post('/api/login', {
    username,
    pwd
  })
}
// 注册
export const register = (username, pwd, mail, tel, QQ) => {
  return post('/api/register', {
    username,
    pwd,
    mail,
    tel,
    QQ
  })
}
