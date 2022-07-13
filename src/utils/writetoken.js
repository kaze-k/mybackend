const execSQL = require('../db/mysql')
const mkToken = require('./mkToken')

// 向数据库写入token
const writeToken = (id, string) => {
  let baseToken = mkToken(50)
  let token = string + baseToken
  let sql = `update login_user set token='${token}' where id=${id}`
  execSQL(sql)
  return token
}

module.exports = writeToken
