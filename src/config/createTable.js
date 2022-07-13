let login_userSQL = `create table if not exists login_user(
                          id int unsigned not null auto_increment,
                          username varchar(8) not null unique,
                          passwd varchar(12) not null,
                          token varchar(120),
                          isroot tinyint(1) not null default false,
                          islogin tinyint(1) not null default true,
                          primary key(id)
                        )ENGINE=InnoDB DEFAULT CHARSET=utf8;`

let studentSQL = `create table if not exists student(
                        id int unsigned not null auto_increment,
                        class varchar(10) not null,
                        num varchar(10) not null unique,
                        Sname varchar(10) not null,
                        sex varchar(1) not null,
                        age int not null,
                        address varchar(100) not null,
                        phone varchar(11) not null,
                        primary key(id)
                      )ENGINE=InnoDB DEFAULT CHARSET=utf8;`

module.exports = {
  login_userSQL,
  studentSQL
}