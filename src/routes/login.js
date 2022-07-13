const userLogin = require('../controllers/login')
const userSignIn = require('../controllers/signIn')
const checkToken = require('../controllers/token')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

const handleLoginRoute = (req, res) => {
  const method = req.method

  // 登录接口
  if (method === "POST" && req.path === '/api/login') {
    const loginData = req.body
    const newLoginDatePromise = userLogin(loginData)
    return newLoginDatePromise.then(newLoginData => {
      if (newLoginData) {
        return new SuccessModel(newLoginData, "登录成功")
      } else {
        return new ErrorModel(newLoginData, "用户名或密码错误")
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
      } else {
        return new ErrorModel(newSignInData, "用户名已被占用")
      }
    })
  }

  // token验证接口
  if (method === "POST" && req.path === '/api/token') {
    const tokenData = req.body
    const newTokenDataPromise = checkToken(tokenData)
    return newTokenDataPromise.then(newTokenData => {
      if (newTokenData) {
        return new SuccessModel(newTokenData, "")
      } else {
        return new ErrorModel(newTokenData, "")
      }
    })
  }

}

module.exports = handleLoginRoute
