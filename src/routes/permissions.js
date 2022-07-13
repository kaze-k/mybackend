const { SuccessModel, ErrorModel } = require('../model/responseModel')
const postUsersData = require('../controllers/postUsersData')
const getUsersData = require('../controllers/getUsersData')
const updatePermissions = require('../controllers/updatePermissions')
const updateLoginState = require('../controllers/updateLoginState')
const delUser = require('../controllers/delUser')
const updateUser = require('../controllers/updateUser')
const signIn = require('../controllers/signIn')

const handlePermissionsRoute = (req, res) => {
  const method = req.method

  // 获取用户列表接口（带密码）
  if (method === "POST" && req.path === '/api/users') {
    const newUsersDataPromise = postUsersData()
    return newUsersDataPromise.then(newUsersData => {
      if (newUsersData) {
        return new SuccessModel(newUsersData, "")
      } else {
        return new ErrorModel(newUsersData, "")
      }
    })
  }

  // 获取用户列表接口（不带密码）
  if (method === "GET" && req.path === '/api/users') {
    const newUsersDataPromise = getUsersData()
    return newUsersDataPromise.then(newUsersData => {
      if (newUsersData) {
        return new SuccessModel(newUsersData, "")
      } else {
        return new ErrorModel(newUsersData, "")
      }
    })
  }

  // 更新用户权限接口
  if (method === "POST" && req.path === '/api/users/permissions') {
    const data =  req.body
    const newPermissionsPromise = updatePermissions(data)
    return newPermissionsPromise.then(newPermissionsData => {
      if (newPermissionsData) {
        return new SuccessModel(newPermissionsData, "更新成功")
      } else {
        return new ErrorModel(newPermissionsData, "更新失败")
      }
    })
  }

  // 更新用户登录状态接口
  if (method == "POST" && req.path === '/api/users/loginState') {
    const data = req.body
    const newloginStatePromise = updateLoginState(data)
    return newloginStatePromise.then(newloginState => {
      if (newloginState) {
        return new SuccessModel(newloginState, "更新成功")
      } else {
        return new ErrorModel(newloginState, "更新失败")
      }
    })
  }

  // 删除用户接口
  if (method == "POST" && req.path === '/api/users/delete') {
    const data = req.body
    const newDataPromise = delUser(data)
    return newDataPromise.then(newData => {
      if (newData) {
        return new SuccessModel(newData, "删除成功")
      } else {
        return new ErrorModel(newData, "删除失败")
      }
    })
  }

  // 更新用户信息接口
  if (method == "POST" && req.path === '/api/users/update') {
    const data = req.body
    const newDataPromise = updateUser(data)
    return newDataPromise.then(newData => {
      if (newData) {
        return new SuccessModel(newData, "更新成功")
      } else {
        return new ErrorModel(newData, "未更新")
      }
    })
  }

  // 添加用户接口
  if (method == "POST" && req.path === '/api/users/add') {
    const data = req.body
    const newDataPromise = signIn(data)
    return newDataPromise.then(newData => {
      if (newData) {
        return new SuccessModel(newData, "更新成功")
      } else {
        return new ErrorModel(newData, "更新失败")
      }
    })
  }

}

module.exports = handlePermissionsRoute