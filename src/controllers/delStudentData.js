const execSQL = require('../db/mysql')

// 删除学生的方法
const delStudentData = (delData) => {
  // HACK
  // console.log("del",delData)
  if (delData) {
    // 获取id
    const id = delData

    // 判断id是否存在
    let sql =`select * from student where id=${id}`
    const data = execSQL(sql).then(resluts => {
      if (JSON.stringify(resluts) !== '[]') {
        let sql = `delete from student where id=${id}`
        // 执行删除
        const data = execSQL(sql).then(resluts => {
          if(resluts) {
            return true
          }
        })
        return data
      } else {
        return false
      }
    })
    return data
  }
}

module.exports = delStudentData