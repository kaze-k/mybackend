const getStudentData = require('../controllers/getStudentData')
const newStudentData = require('../controllers/newStudentData')
const delStudentData = require('../controllers/delStudentData')
const updateStudentData = require('../controllers/updateStudentData')
const checkToken = require('../controllers/token')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

const handleStudentRoute = (req, res) => {
  const method = req.method

  // 获取学生列表接口
  if (method === "GET" && req.path === '/api/student') {
    const newStudentDataPromise = getStudentData()
    return newStudentDataPromise.then(newStudentData => {
      // HACK:测试
      // console.log("res",newStudentData)
      if (newStudentData) {
        return new SuccessModel(newStudentData, "")
      } else {
        return new ErrorModel(newStudentData, "")
      }
    })
  }

  // 新增学生信息接口
  if (method === "POST" && req.path === '/api/student/new') {
    const newData = req.body
    const token = req.headers
    const checkTokenPromise = checkToken(token)
    return checkTokenPromise.then(checkToken => {
      // HACK:测试
      // console.log("check",checkToken)
      if (checkToken) {
        const newAddDataPromise = newStudentData(newData)
        return newAddDataPromise.then(newAddData => {
          // HACK:测试
          // console.log("res", newAddData)
          if (newAddData) {
            return new SuccessModel(newAddData, "新建成功")
          } else {
            return new ErrorModel(newAddData, "该学号已存在")
          }
        })
      } else {
        return new ErrorModel(checkToken, "身份验证失败")
      }
    })
  }

  // 删除学生信息接口
  if (method === "POST" && req.path === '/api/student/delete') {
    const delData = req.body
    // HACK
    // console.log(delData)
    const token = req.headers
    const checkTokenPromise = checkToken(token)
    return checkTokenPromise.then(checkToken => {
      if (checkToken) {
        const newDelDataPromise = delStudentData(delData)
        return newDelDataPromise.then(newDelData => {
          if (newDelData) {
            return new SuccessModel(newDelData, "删除成功")
          } else {
            return new ErrorModel(newDelData, "删除失败")
          }
        })
      } else {
        return new ErrorModel(checkToken, "身份验证失败")
      }
    })
  }

  // 更新学生信息接口
  if (method === "POST" && req.path === '/api/student/update') {
    const data = req.body
    const token = req.headers
    const checkTokenPromise = checkToken(token)
    return checkTokenPromise.then(checkToken => {
      if (checkToken) {
        const newDataPromise = updateStudentData(data)
        return newDataPromise.then(newData => {
          if (newData) {
            return new SuccessModel(newData, "更新成功")
          } else {
            return new ErrorModel(newData, "更新失败")
          }
        })
      } else {
        return new ErrorModel(checkToken, "身份验证失败")
      }
    })
  }

}

module.exports = handleStudentRoute
