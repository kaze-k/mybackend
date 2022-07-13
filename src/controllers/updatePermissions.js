const execSQL = require('../db/mysql')
const writeToken = require('../utils/writetoken')

const updatePermissions = (data) => {
  if (data) {
    // 用户的id
    const id = data.id
    // 用户的权限
    const permissions = data.state
    if (permissions === true) {
      let sql = `update login_user set isroot=true where id=${id} `
      const data = execSQL(sql).then(results => {
        writeToken(id, "[sudo]")
        return true
      })
      return data
    } else {
      let sql = `update login_user set isroot=false where id=${id} `
      const data = execSQL(sql).then(results => {
        writeToken(id, "")
        return true
      })
      return data
    }
  }
}

  module.exports = updatePermissions