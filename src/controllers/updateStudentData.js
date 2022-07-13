const execSQL = require('../db/mysql')

const updateStudentData = (data) => {
  if (data) {
    // 获取用户新信息
    const { id, num, Sname, sex, age, address, phone } = data
    const Sclass = data.class
    // 查询有无修改学号
    let sql =`select num from student where id=${id}`
    return execSQL(sql).then(res => {
      // 获取用户原来的学号
      const oldNum = JSON.parse(JSON.stringify(res[0].num))
      if (oldNum !== num) {
        // 查询有无同学号
        let sql = `select id from student where num='${num}'`
        return execSQL(sql).then(res => {
          if (JSON.stringify(res) === '[]') {
            // 执行更新信息
            let sql = `update student set num='${num}', class='${Sclass}', Sname='${Sname}', sex='${sex}', age=${age}, address='${address}', phone='${phone}' where id=${id}`
            return execSQL(sql).then(() => true)
          }
        })
      } else {
        // 执行更新信息
        let sql = `update student set class='${Sclass}', Sname='${Sname}', sex='${sex}', age=${age}, address='${address}', phone='${phone}' where id=${id}`
        return execSQL(sql).then(() => true)
      }
    })
  }
}

module.exports = updateStudentData