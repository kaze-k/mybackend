const execSQL = require('../db/mysql')

// 修改用户名的方法
const changeUsername = (data) => {
  if (data) {
    // 获取用户修改的用户名
    const newName = data.newName
    // 获取用户的旧用户名
    const oldName = data.oldName
    // 查询有无同名
    let sql =  `select id from login_user where username='${newName}'`
    return execSQL(sql).then(res => {
      if (JSON.stringify(res) === '[]') {
        // 查询用户的id
        let sql = `select id from login_user where username='${oldName}'`
        return execSQL(sql).then(res => {
          const id = JSON.parse(JSON.stringify(res[0].id))
          // root用户(id:1)无法修改用户名
          if (id !== 1) {
            // 执行修改用户名
            let sql = `update login_user set username='${newName}', token=null where id=${id}`
            return execSQL(sql).then(() => true)
          }
        })
      }
    })
  }
}

module.exports = changeUsername