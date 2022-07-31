const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const setHeader = require('./src/utils/setHeader')
const apiRoute = require('./src/routes/api/index')

app.use(bodyParser.json())

// 首页
app.get('/', (req, res) => {
  res.header("Content-Type", "text/plain;charset=utf-8");
  res.write("服务正常运行")
  res.status(200)
  res.send()
})

// api路由
app.use('/api', apiRoute)

app.all('*', setHeader, (req, res) => {
  // 404
  res.status(404)
  res.send()
})

module.exports = app