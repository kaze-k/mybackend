const execSQL = require('../db/mysql')

const updateLoginState = (data) => {
  if (data) {
    // 用户的id
    const {id, state} = data
    // 用户的权限
    if (state === true) {
      let sql = `update login_user set islogin=true, token=null where id=${id} `
      return execSQL(sql).then(() => true)
    } else {
      let sql = `update login_user set islogin=false, token=null where id=${id} `
      return execSQL(sql).then(() => true)
    }
  }
}

module.exports = updateLoginState
