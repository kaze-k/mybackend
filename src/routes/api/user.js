const express = require('express')
const changePasswd = require('../../controllers/changePasswd')
const changeUsername = require('../../controllers/changeUsername')
const handleRouter = require('../../utils/handleRouter')
const validateToken = require('../../utils/validateToken')
const router = express.Router()

// token验证
router.use(validateToken)

// 修改个人用户密码接口
router.post('/passwd', (req, res) => {
  const data = req.body
  const dataPromise = changePasswd(data)
  handleRouter(dataPromise, res, "修改成功", "无法修改")
})

// 修改个人用户的用户名接口
router.post('/username', (req, res) => {
  const data = req.body
  const dataPromise = changeUsername(data)
  handleRouter(dataPromise, res, "修改成功", "用户名已被占用")
})

module.exports = router