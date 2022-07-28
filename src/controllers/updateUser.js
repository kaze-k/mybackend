const execSQL = require('../db/mysql')

const updateUser = (data) => {
  if (data) {
    // 获取用户id，用户名，密码
    const {id, username, passwd} = data

    let sql = `select username, passwd from login_user where id=${id}`

    const res = async () => {
      const results = await execSQL(sql)
      if (results) {
        const userData = JSON.parse(JSON.stringify(results[0]))

        // 只修改用户名
        if (userData.username !== username && userData.passwd === passwd) {
          let sql = `select id from login_user where username='${username}'`
          const results = await execSQL(sql)
          if (JSON.stringify(results) === '[]') {
            let sql = `select username, id from login_user where id=${id}`
            const results = await execSQL(sql)
            const uid = JSON.parse(JSON.stringify(results[0].id))
            if (uid === id) {
              let sql = `update login_user set username='${username}' where id=${id}`
              await execSQL(sql)
              return true
            }
          }
        }

        // 只修改密码
        if (userData.username === username && userData.passwd !== passwd) {
          let sql = `select username, id from login_user where id=${id}`
          const results = await execSQL(sql)
          const uid = JSON.parse(JSON.stringify(results[0].id))
          if (uid === id) {
            let sql = `update login_user set passwd='${passwd}', token=null where id=${id}`
            await execSQL(sql)
            return true
          }
        }

        // 用户名和密码都修改
        if (userData.username !== username && userData.passwd !== passwd) {
          let sql = `select id from login_user where username='${username}'`
          const results = await execSQL(sql)
          if (JSON.stringify(results) === '[]') {
            let sql = `select id from login_user where id=${id}`
            const results = await execSQL(sql)
            const uid = JSON.parse(JSON.stringify(results[0].id))
            if (uid === id) {
              let sql = `update login_user set username='${username}', passwd='${passwd}', token=null where id=${id}`
              await execSQL(sql)
              return true
            }
          }
        }
      }
    }

    return res()
  }
}

module.exports = updateUser
