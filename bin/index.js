const http = require('http')
const app = require('../app')

// 端口设置
const port = 5000

// IP设置
const host = '127.0.0.1'

// 服务
const server = http.createServer(app)

// 请求时间设置
server.timeout = 3000

server.listen(port, host, () => console.log(`服务正运行在 http://${host}:${port}`))