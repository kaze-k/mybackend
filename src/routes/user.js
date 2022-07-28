const {SuccessModel, ErrorModel} = require('../model/responseModel')
const changePasswd = require('../controllers/changePasswd')
const changeUsername = require('../controllers/changeUsername')

const handleUserRoute = (req, res) => {
  const method = req.method

  // 修改个人用户密码接口
  if (method === "POST" && req.path === '/api/user/passwd') {
    const data = req.body
    const userDataPromise = changePasswd(data)
    return userDataPromise.then(userData => {
      if (userData) {
        return new SuccessModel(userData, "修改成功")
      } else {
        return new ErrorModel(userData, "无法修改")
      }
    })
  }

  // 修改个人用户的用户名接口
  if (method === "POST" && req.path === '/api/user/username') {
    const data = req.body
    const userDataPromise = changeUsername(data)
    return userDataPromise.then(userData => {
      if (userData) {
        return new SuccessModel(userData, "修改成功")
      } else {
        return new ErrorModel(userData, "用户名已被占用")
      }
    })
  }
}

module.exports = handleUserRoute
