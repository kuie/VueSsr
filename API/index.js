'use strict'
import path from 'path'
import { post } from '../util/fetch'
// 登陆
export const login = (username, pwd) => {
  return post(path.join('/api/user/login'), {
    username,
    pwd
  })
}
// 注册
export const register = (username, pwd, mail, tel, QQ) => {
  return post(path.join('/api/user/register'), {
    username,
    pwd,
    mail,
    tel,
    QQ
  })
}
