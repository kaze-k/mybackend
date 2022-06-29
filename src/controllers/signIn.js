const execSQL = require('../db/mysql')

const userSignIn = (signInData) => {
  if (signInData) {
    let sql = `select * from login_user where username='${signInData.username}'`
    const data = execSQL(sql).then(reslut => {
      // JSON.stringify将对象转成JSON字符串，可以用来判断给对象是否为空
      if (JSON.stringify(reslut) !== '[]') {
        const username = reslut[0].username

        // 判断用户注册的用户名是否已在数据库中
        if (username === signInData.username) {
          return false
        }
      } 

      else {
        let sql = `insert into login_user(username, passwd) values ('${signInData.username}', '${signInData.password}')`
        const data = execSQL(sql).then(reslut => {
          console.log("res:", reslut)
          if (reslut) {
            return true
          }
        })
        return data
      }
    })

    return data
  }
}

module.exports = userSignIn