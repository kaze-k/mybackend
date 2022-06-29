const token = require('../utils/token')
const execSQL = require('../db/mysql')

// 登录相关的方法
const userLogin = (loginData) => {
  let sql = `select * from login_user where username='${loginData.username}'`
  const data = execSQL(sql).then(reslut => {
    if (JSON.stringify(reslut) !== '[]') {
      // 获取数据库的用户的用户名
      const username = reslut[0].username
      // 获取数据库的用户的密码
      const password = reslut[0].passwd

      // 用户名和密码验证
      if (loginData.password == password) {
        return {
          token: token(100),
          username: username,
        }
      } else {
        return false
      }
    }
  })
  return data
}

module.exports = userLogin
