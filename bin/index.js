const http = require('http')
const serverHandler = require('../app')

const port = 5000
const host = '127.0.0.1'

const server = http.createServer(serverHandler)

server.timeout = 3000

server.listen(port, host, () => {
  console.log(`服务器正运行在 http://${host}:${port}/...`)
})
