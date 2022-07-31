const mysql = require('mysql')
const MYSQL_CONFIG = require('../config/db')
const { login_userSQL, studentSQL } = require('../config/createTable')
const rootSQL = require('../config/insertRoot')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
connection.connect(() => {
  console.log("* 数据库已连接")
  connection.query(login_userSQL, () => console.log("* 用户数据表已创建"))
  connection.query(studentSQL, () => console.log("* 学生数据表已创建"))
  connection.query(rootSQL, () => console.log("* root管理员已创建"))
})

// 执行 sql 语句
function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = execSQL