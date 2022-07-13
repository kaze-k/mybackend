const execSQL = require('../db/mysql')

const handleTestRoute = (req, res) => {
  const method = req.method

  // HACK:测试接口
  if (method === "GET" && req.path === '/api/test') {
    const sql = `select * from login_user where username='test'`
    return execSQL(sql).then(reslut => {
      // HACK:测试
      const data = reslut[0].passwd
      console.log('result', data)
      return {
        message: "测试接口",
        data: data
      }
    })
  }

}

module.exports = handleTestRoute