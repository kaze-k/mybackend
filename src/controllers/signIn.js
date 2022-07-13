const execSQL = require('../db/mysql')

const userSignIn = (signInData) => {
  // HACK:测试
  // console.log(signInData)
  if (signInData) {
    let sql = `select * from login_user where username='${signInData.username}'`
    const data = execSQL(sql).then(resluts => {
      // JSON.stringify将对象转成JSON字符串，可以用来判断给对象是否为空
      if (JSON.stringify(resluts) !== '[]') {
        const username = resluts[0].username

        // 判断用户注册的用户名是否已在数据库中
        if (username === signInData.username) {
          return false
        }
      } 

      else {
        let sql = `insert into login_user(username, passwd) values ('${signInData.username}', '${signInData.passwd}')`
        const data = execSQL(sql).then(resluts => {
          // HACK:测试
          // console.log("res:", reslut)
          if (resluts) {
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