const { SuccessModel, ErrorModel } = require("../model/responseModel")

const handleRouter = (dataPromise, res, successMsg, errorMsg) => {
  return dataPromise.then(data => {
    if (data) {
      return res.send(new SuccessModel(data, successMsg))
    } else {
      return res.send(new ErrorModel(data, errorMsg))
    }
  })
}

module.exports = handleRouter