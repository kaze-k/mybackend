let rootSQL = `insert ignore into login_user(id, username, passwd, isroot, islogin)
                values
                (1, 'root', 'xxx', true, true)`

module.exports = rootSQL
