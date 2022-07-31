const express = require('express')
const userLogin = require('../../controllers/login')
const userSignIn = require('../../controllers/signIn')
const checkToken = require('../../controllers/token')
const handleRouter = require('../../utils/handleRouter')
const userRoute = require('./user')
const usersRoute = require('./userslist')
const studentRoute = require('./student')
const router = express.Router()


// 登录接口
router.post('/login', (req, res) => {
  const data = req.body
  const dataPromise = userLogin(data)
  handleRouter(dataPromise, res, "登录成功", "用户名或密码错误")
})

// 注册接口
router.post('/signIn', (req, res) => {
  const data = req.body
  const dataPromise = userSignIn(data)
  handleRouter(dataPromise, res, "注册成功", "用户名已被占用")
})

// token验证接口
router.post('/token', (req, res) => {
  const data = req.body
  const dataPromise = checkToken(data)
  handleRouter(dataPromise, res)
})

// 子路由
router.use('/user', userRoute)
router.use('/users', usersRoute)
router.use('/student', studentRoute)

module.exports = router