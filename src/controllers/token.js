const execSQL = require('../db/mysql')

const checkToken = (tokenData) => {
  if (tokenData) {
    let sql = `select * from login_user where username='${tokenData.username}'`
    return execSQL(sql).then(results => {
      // HACK:测试
      // console.log(results)
      if (JSON.stringify(results) !== '[]') {
        // 获取用户的token
        const token = results[0].token
        // 获取用户的登录状态
        const islogin = results[0].islogin

        // 判断用户是否可登录
        if (islogin === 0) {
          return false
        }
        // 判断用户是否为管理员
        // 对比客户端传过的token与数据库的token是否一致
        if (token === tokenData.token) {
          return true
        }
      } else {
        return false
      }
    })
  }
}

module.exports = checkToken
