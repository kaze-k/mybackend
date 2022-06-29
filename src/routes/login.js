const userLogin = require('../controllers/login')
const userSignIn = require('../controllers/signIn')
const execSQL = require('../db/mysql')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

const handleLoginRoute = (req, res) => {
  const method = req.method

  // 登录接口
  if (method === "POST" && req.path === '/api/login') {
    const loginData = req.body
    const newLoginDatePromise = userLogin(loginData)
    return newLoginDatePromise.then(newLoginDate => {
      if (newLoginDate) {
        return new SuccessModel(newLoginDate, "登录成功")
      } else {
        return new ErrorModel(newLoginDate, "用户名或密码错误")
      }
    })
  }

  // 注册接口
  if (method === "POST" && req.path === '/api/signIn') {
    const signInData = req.body
    const newSignInDataPromise = userSignIn(signInData)
    return newSignInDataPromise.then(newSignInData => {
      if (newSignInData) {
        return new SuccessModel(newSignInData, "注册成功")
      }
      else {
        return new ErrorModel(newSignInData, "用户名已被占用")
      }
    })
  }

  // HACK:测试接口
  if (method === "GET" && req.path === '/api/test') {
    const sql = `select * from login_user where username='kaze'`
    return execSQL(sql).then(reslut => {
      // HACK:测试
      const data = reslut[0].passwd
      console.log('result', data)
      return { message: "测试接口" }
    })
  }
}

module.exports = handleLoginRoute
