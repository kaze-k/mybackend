const execSQL = require('../db/mysql')

// 删除学生的方法
const delStudentData = (delData) => {
  // HACK
  // console.log("del",delData)
  if (delData) {
    // 获取id
    const { id } = delData

    // 判断id是否存在
    let sql = `select id from student where id=${id}`

    const res = async () => {
      const resluts = await execSQL(sql)
      if (JSON.stringify(resluts) !== '[]') {
        let sql = `delete from student where id=${id}`
        await execSQL(sql)
        return true
      }
    }

    return res()
  }
}

module.exports = delStudentData
