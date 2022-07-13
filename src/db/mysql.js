const mysql = require('mysql')
const MYSQL_CONFIG = require('../config/db')
const { login_userSQL, studentSQL } = require('../config/createTable')
const rootSQL = require('../config/insertRoot')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
connection.connect(() => {
  connection.query(login_userSQL)
  connection.query(studentSQL)
  connection.query(rootSQL)
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