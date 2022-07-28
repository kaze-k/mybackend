const execSQL = require('../db/mysql')

const userSignIn = (signInData) => {
  // HACK:测试
  // console.log(signInData)
  if (signInData) {
    let sql = `select * from login_user where username='${signInData.username}'`

    const res = async () => {
      const res = await execSQL(sql)
      // HACK:测试
      // console.log("数据库:", res)
      // 判断数据库中是否有该用户名
      if (JSON.stringify(res) === "[]") {
        let sql = `insert into login_user(username, passwd) values ('${signInData.username}', '${signInData.passwd}')`
        const data = await execSQL(sql)
        // HACK:测试
        // console.log("添加数据:", data)
        if (data) return true
      }
    }

    return res()
  }
}

module.exports = userSignIn
