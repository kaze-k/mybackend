const execSQL = require('../db/mysql')

const updateLoginState = (data) => {
  if (data) {
    // 用户的id
    const id = data.id
    // 用户的权限
    const loginState = data.state
    if (loginState === true) {
      let sql = `update login_user set islogin=true where id=${id} `
      const data = execSQL(sql).then(results => {
        let sql = `update login_user set token=null where id=${id}`
        execSQL(sql)
        return true
      })
      return data
    } else {
      let sql = `update login_user set islogin=false where id=${id} `
      const data = execSQL(sql).then(results => {
        let sql = `update login_user set token=null where id=${id}`
        execSQL(sql)
        return true
      })
      return data
    }
  }
}

module.exports = updateLoginState