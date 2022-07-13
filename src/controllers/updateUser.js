const execSQL = require('../db/mysql')

const updateUser = (data) => {
  if (data) {
    // 获取用户id
    const id = data.id
    // 获取用户名
    const username = data.username
    // 获取用户密码
    const passwd = data.passwd
    let userSql = `select username, passwd from login_user where id=${id}`
    return execSQL(userSql).then(results => {
      const userData = JSON.parse(JSON.stringify(results[0]))
      // 只修改用户名
      if (userData.username !== username) {
        let sql = `select username,id from login_user where id=${id}`
        return execSQL(sql).then(results => {
          const uId = JSON.parse(JSON.stringify(results[0].id))
          if (uId === id) {
            let sql = `update login_user set username='${username}' where id=${id}`
            return execSQL(sql).then(res => {
              return true
            })
          }
        })
      }
      // 只修改密码
      if (userData.passwd !== passwd) {
        let sql = `select username, id from login_user where id=${id}`
        return execSQL(sql).then(results => {
          const uId = JSON.parse(JSON.stringify(results[0].id))
          if (uId === id) {
            let sql = `update login_user set passwd='${passwd}', token=null where id=${id}`
            return execSQL(sql).then(res => {
              return true
            })
          }
        })
      }
      // 用户名和密码都修改
      if (userData.username !== username && userData.passwd !== passwd) {
        let sql = `select id from login_user where username='${username}', passwd='${passwd}'`
        return execSQL(sql).then(results => {
          const uId = JSON.parse(JSON.stringify(results[0].id))
          if (uId === id) {
            let sql = `update login_user set username='${username}', passwd='${passwd}', token=null where id=${id}`
            return execSQL(sql).then(res => {
              return true
            })
          }
        })
      }
    })
  }
}

module.exports = updateUser