const execSQL = require('../db/mysql')

const updateStudentData = (data) => {
  if (data) {
    // 获取用户新信息
    const {id, num, Sname, Sclass, sex, age, address, phone} = data
    // 查询有无修改学号
    let sql = `select num from student where id=${id}`
    const res = async () => {
      const results = await execSQL(sql)
      // 获取用户原来的学号
      const oldNum = JSON.parse(JSON.stringify(results[0].num))
      if (oldNum !== num) {
        // 查询有无相同学号
        let sql = `select id from student where num='${num}'`
        const results = await execSQL(sql)
        if (JSON.stringify(results) === '[]') {
          // 执行更新信息
          let sql = `update student set num='${num}', Sclass='${Sclass}', Sname='${Sname}', sex='${sex}', age=${age}, address='${address}', phone='${phone}' where id=${id}`
          await execSQL(sql)
          return true

        }
      } else {
        let sql = `update student set Sclass='${Sclass}', Sname='${Sname}', sex='${sex}', age=${age}, address='${address}', phone='${phone}' where id=${id}`
        await execSQL(sql)
        return true
      }
    }

    return res()
  }
}

module.exports = updateStudentData
