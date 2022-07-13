const execSQL = require('../db/mysql')
const writeToken = require('../utils/writetoken')

// 登录相关的方法
const userLogin = (loginData) => {
  let sql = `select * from login_user where username='${loginData.username}'`
  const data = execSQL(sql).then(reslut => {
    if (JSON.stringify(reslut) !== '[]') {
      // 获取用户的id
      const id = reslut[0].id
      // 获取用户的用户名
      const username = reslut[0].username
      // 获取用户的密码
      const password = reslut[0].passwd
      // 获取用户是否为管理员的标记
      const isroot = reslut[0].isroot
      // 获取用户是否可登录的标记
      const islogin = reslut[0].islogin

      // 判断用户是否可登录
      if (islogin === 0) {
        return false
      }

      // 用户名和密码验证
      if (loginData.passwd == password) {
        // 判断用户是否为管理员
        if (id !== 1 && isroot === 1) {

          return {
            token: writeToken(id, "[sudo]"),
            username: username,
          }
        }

        // 超级管理员
        if (id === 1) {
          return {
            token: writeToken(id, "[root]"),
            username: username,
          }
        }

        // 普通用户
        if (isroot === 0) {
          return {
            token: writeToken(id, ""),
            username: username,
          }
        }

      } else {
        return false
      }
    }
  })
  return data
}

module.exports = userLogin
