const querystring = require('querystring')
const handleLoginRoute = require('./src/routes/login')
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
        console.log(JSON.stringify(loginData))
        res.end(JSON.stringify(loginData))  // 结束请求
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
