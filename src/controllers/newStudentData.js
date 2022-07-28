const execSQL = require('../db/mysql')

// 新建学生的方法
const newStudentData = (newData) => {
  if (newData) {
    // 获取数据
    const {Sclass, num, Sname, sex, age, address, phone} = newData

    let sql = `select id from student where num='${num}'`

    const res = async () => {
      const results = await execSQL(sql)
      // HACK:测试
      // console.log("results", results)
      // 判断数据是否已存在
      if (JSON.stringify(results) === '[]') {
        let iSql = `insert into student(Sclass, num, Sname, sex, age, address, phone) values`
        let vSql = `('${Sclass}','${num}','${Sname}','${sex}',${age},'${address}','${phone}')`
        let sql = iSql + " " + vSql
        // 写入数据
        const results = await execSQL(sql)
        if (results) return true
      }
    }

    return res()
  }
}

module.exports = newStudentData
