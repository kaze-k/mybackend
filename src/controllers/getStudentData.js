const execSQL = require('../db/mysql')

const getStudentData = () => {
  const sql = `select * from student`
  const data = execSQL(sql).then(results => {
    results = JSON.stringify(results)
    results = JSON.parse(results)
    return results
  })
  return data
}

module.exports = getStudentData