class BaseModel {
  constructor(data, message) {
    if (data && data instanceof Object) {
      this.data = data
    }

    if (message && typeof message === "string") {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
    return this
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = -1
    return this
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
