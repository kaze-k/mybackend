const express = require('express')
const signIn = require('../../controllers/signIn')
const delUser = require('../../controllers/delUser')
const getUsersData = require('../../controllers/getUsersData')
const postUsersData = require('../../controllers/postUsersData')
const updateLoginState = require('../../controllers/updateLoginState')
const updatePermissions = require('../../controllers/updatePermissions')
const updateUser = require('../../controllers/updateUser')
const handleRouter = require('../../utils/handleRouter')
const validateToken = require('../../utils/validateToken')
const router = express.Router()


// token验证
router.use(validateToken)

// 获取用户列表接口(不带密码)
router.get('/', (req, res) => {
  const dataPromise = getUsersData()
  handleRouter(dataPromise, res)
})

// 获取用户列表接口(带密码)
router.post('/', (req, res) => {
  const dataPromise = postUsersData()
  handleRouter(dataPromise, res)
})

// 更新用户权限接口
router.put('/permissions', (req, res) => {
  const data = req.body
  const dataPromise = updatePermissions(data)
  handleRouter(dataPromise, res, "更新成功", "更新失败")
})

// 更新用户登录状态接口
router.put('/loginState', (req, res) => {
  const data = req.body
  const dataPromise = updateLoginState(data)
  handleRouter(dataPromise, res, "更新成功", "更新失败")
})

// 删除用户接口
router.delete('/delete', (req, res) => {
  const data = req.body
  const dataPromise = delUser(data)
  handleRouter(dataPromise, res, "删除成功", "删除失败")
})

// 更新用户信息接口
router.put('/update', (req, res) => {
  const data = req.body
  const dataPromise = updateUser(data)
  handleRouter(dataPromise, res, "更新成功", "用户名已被占用")
})

// 添加用户接口
router.post('/add', (req, res) => {
  const data = req.body
  const dataPromise = signIn(data)
  handleRouter(dataPromise,res, "添加成功", "添加失败")
})

module.exports = router