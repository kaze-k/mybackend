const checkToken = require('../controllers/token')

const validateToken = (req, res, next) => {
  const data = req.headers
  const checkTokenPromise = checkToken(data)
  if (checkTokenPromise) {
    return checkTokenPromise.then(data => {
      if (data) {
        next()
      }
      else {
        if (data === null) return res.status(404)
        return res.send({ message: "身份验证失败" })
      }
    })
  }
}

module.exports = validateToken