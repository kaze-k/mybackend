const mysql = require('mysql')
const MYSQL_CONFIG = require('../config/db')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
connection.connect()

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