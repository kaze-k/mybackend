const execSQL = require("../db/mysql")

// 新建学生的方法
const newStudentData = (newData) => {
  if (newData) {
    // 获取数据
    const Sclass = newData.class
    const num = newData.num
    const name = newData.Sname
    const sex = newData.sex
    const age = newData.age
    const address = newData.address
    const phone = newData.phone

    let sql = `select id from student where num='${num}'`
    const data = execSQL(sql).then(resluts => {
      // HACK:测试
      // console.log("resluts",resluts)
      // 判断数据是否已存在
      if (JSON.stringify(resluts) === '[]') {
        let iSql = `insert into student(class, num, Sname, sex, age, address, phone) values`
        let vSql = `('${Sclass}','${num}','${name}','${sex}',${age},'${address}','${phone}')`
        let sql = iSql + " " + vSql
        // 写入数据
        const data = execSQL(sql).then(resluts => {
          if (resluts) {
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

module.exports = newStudentData