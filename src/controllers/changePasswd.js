const execSQL = require('../db/mysql')

// 修改密码的方法
const changePasswd = (data) => {
  if (data) {
    // 获取用户修改的密码
    const passwd = data.passwd
    // 获取用户的用户名
    const username = data.username
    // 查询用户的id
    let sql = `select id from login_user where username='${username}'`
    return execSQL(sql).then(res => {
      const id = JSON.parse(JSON.stringify(res[0].id))
      // root用户(id:1)无法修改密码
      if (id !== 1) {
        // 执行修改密码
        let sql = `update login_user set passwd='${passwd}', token=null where id=${id}`
        return execSQL(sql).then(() => true)
      }
    })
  }
}

module.exports = changePasswd