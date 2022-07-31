const execSQL = require('../db/mysql')

const delUser = (data) => {
  if (data) {
    // 获取用户id
    const { id } = data
    let sql = `delete from login_user where id=${id}`
    return execSQL(sql).then(results => {
      if (results) return true
    })
  }
}

module.exports = delUser
