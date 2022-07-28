const execSQL = require('../db/mysql')

const getStudentData = () => {
  const sql = `select * from student`
  return execSQL(sql).then(results => {
    results = JSON.parse(JSON.stringify(results))
    return results
  })
}

module.exports = getStudentData
