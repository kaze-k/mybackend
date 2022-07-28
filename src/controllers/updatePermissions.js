const execSQL = require('../db/mysql')
const writeToken = require('../utils/writetoken')

const updatePermissions = (data) => {
  if (data) {
    // 用户的id，权限
    const {id, state} = data
    if (state === true) {
      let sql = `update login_user set isroot=true where id=${id} `
      return execSQL(sql).then(() => {
        writeToken(id, "[sudo]")
        return true
      })
    } else {
      let sql = `update login_user set isroot=false where id=${id} `
      return execSQL(sql).then(() => {
        writeToken(id, "")
        return true
      })
    }
  }
}

module.exports = updatePermissions
