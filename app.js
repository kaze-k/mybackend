const querystring = require('querystring')
const handleLoginRoute = require('./src/routes/login')
const handleStudentRoute = require('./src/routes/student')
const handleTestRoute = require('./src/routes/test')
const handlePermissionsRoute = require('./src/routes/permissions')
const handleUserRoute = require('./src/routes/user')
const getPostData = require('./src/utils/getPostData')


const serverHandler = (req, res) => {
  // 设置响应格式
  res.setHeader('Content-Type', 'application/json')

  // 获取路径
  const url = req.url
  req.path = url.split('?')[0]

  // 解析参数
  req.query = querystring.parse(url.split('?')[1])

  // 处理POST数据
  getPostData(req).then((postData) => {
    req.body = postData

    // 登录相关的路由
    const loginDataPromise = handleLoginRoute(req, res)
    if (loginDataPromise) {
      loginDataPromise.then(loginData => {
        // HACK:测试
        // console.log(JSON.stringify(loginData))
        res.end(JSON.stringify(loginData))  // 结束请求
      })
      return
    }

    // 学生信息相关的路由
    const studentDataPromise = handleStudentRoute(req, res)
    if (studentDataPromise) {
      studentDataPromise.then(studentData => {
        // HACK:测试
        // console.log("student", JSON.stringify(studentData))
        res.end(JSON.stringify(studentData))
      })
      return
    }

    // 权限相关的路由
    const permissionsDataPromise = handlePermissionsRoute(req, res)
    if (permissionsDataPromise) {
      permissionsDataPromise.then(PermissionsData => {
        res.end(JSON.stringify(PermissionsData))
      })
      return
    }

    // 个人用户相关的路由
    const userDataPromise = handleUserRoute(req, res)
    if (userDataPromise) {
      userDataPromise.then(userData => {
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 测试的路由
    const testDataPromise = handleTestRoute(req, res)
    if (testDataPromise) {
      testDataPromise.then(testData => {
        // HACK:测试
        console.log(JSON.stringify(testData))
        res.end(JSON.stringify(testData)) // 结束请求
      })
      return
    }

    // 用户访问不存在的路由时返回404
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found')
    res.end()
  })

}

module.exports = serverHandler
