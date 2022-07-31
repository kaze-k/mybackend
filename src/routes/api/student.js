const express = require('express')
const delStudentData = require('../../controllers/delStudentData')
const getStudentData = require('../../controllers/getStudentData')
const newStudentData = require('../../controllers/newStudentData')
const updateStudentData = require('../../controllers/updateStudentData')
const handleRouter = require('../../utils/handleRouter')
const validateToken = require('../../utils/validateToken')
const router = express.Router()

// token验证
router.use(validateToken)

// 获取学生列表接口
router.get('/', (req, res) => {
  const dataPromise = getStudentData()
  handleRouter(dataPromise, res)
})

// 新增学生信息接口
router.post('/new', (req, res) => {
  const data = req.body
  const dataPromise = newStudentData(data)
  handleRouter(dataPromise, res, "新建成功", "该学号已存在")
})

// 删除学生信息接口
router.delete('/delete', (req, res) => {
  const data = req.body
  const dataPromise = delStudentData(data)
  handleRouter(dataPromise, res, "删除成功", "删除失败")
})

// 更新学生信息接口
router.put('/update', (req, res) => {
  const data = req.body
  const dataPromise = updateStudentData(data)
  handleRouter(dataPromise, res, "更新成功", "该学号已存在")
})

module.exports = router