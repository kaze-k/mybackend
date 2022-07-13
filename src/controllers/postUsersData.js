const execSQL = require('../db/mysql')

const postUsersData = () => {
  const sql = `select * from login_user where id!=1`
  return execSQL(sql).then(results => {
    results = JSON.parse(JSON.stringify(results))
    results.forEach(i => {
      if (i.isroot === 1) {
        i.isroot = true
      } else {
        i.isroot = false
      }

      if (i.islogin === 1) {
        i.islogin = true
      } else {
        i.islogin = false
      }
    })
    return results
  })
}


module.exports = postUsersData