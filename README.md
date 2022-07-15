# mybackend

> 我的第一个后端项目:trollface:
>
> nodejs+mysql,实现简单的crud

🔗 前端仓库：[myfrontend](https://github.com/kaze-k/myfrontend)

📺 效果展示：[www.lsh28.cn:5000](http://www.lsh28.cn:5000)

## 💡 项目设置

### 安装项目依赖
```
yarn install
```

### 项目启动
```
yarn serve
```

### 必需配置项

数据库配置: `mybackend/src/config/db.js`
``` js
MYSQL_CONFIG = {
  host: 'xxx',     // 数据库ip，如果是部署项目的服务器上的数据库可设为127.0.0.1
  user: 'xxx',     // 数据库用户
  password: 'xxx', // 数据库密码
  port: 'xxx',     // 数据库端口，默认为3306
  database: 'xxx'  // 数据库名称
}
```

root用户密码配置: `mybackend/src/config/insertRoot.js`
``` js
let rootSQL = `insert ignore into login_user(id, username, passwd, isroot, islogin)
                values
                (1, 'root', 'xxx', true, true)`
                // 将xxx改为长度为6-12位且带数字字母的密码，前端的要求
```

🔥 关闭测试接口: `mybackend/app.js`
``` js
    // 测试的路由
    /* const testDataPromise = handleTestRoute(req, res)
    if (testDataPromise) {
      testDataPromise.then(testData => {
        // HACK:测试
        console.log(JSON.stringify(testData))
        res.end(JSON.stringify(testData)) // 结束请求
      })
      return
    } */
```

> 一切就绪后，你的数据库会自动生成login_user和student两个表，且login_user表中会有root用户的数据。
>
> 如果想要修改表的名称和字段可以到`mybackend/src/config/createTable.js`中修改。

## 🎬 服务器部署

### PM2

[PM2官网](https://pm2.keymetrics.io/)

## 💾 数据库

### 用户数据表

| 字段名 | 字段描述 | 类型 | 是否可为空 | 默认值 | Extra | 键 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| id | 用户id | int unsigned | 否 | 无 | auto_increment(自增约束) | PRI(主键) |
| username | 用户名 | varchar(8) | 否 | 无 || UNI(唯一) |
| passwd | 用户密码 | varchar(12) | 否 | 无 |
| token | token凭证 | varchar(120) | 是 | 无 |
| isroot | 是否为管理员 | tinyint(1) | 否 | false(0) |
| islogin | 是否可登录 | tinyint(1) | 否 | true(1) |

### 学生数据表

| 字段名 | 字段描述 | 类型 | 是否可为空 | 默认值 | Extra | 键 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| id | 学生id | int unsigned | 否 | 无 | auto_increment(自增约束) | PRI(主键) |
| class | 学生班级 | varchar(10) | 否 | 无 |
| num | 学生学号 | varchar(10) | 否 | 无 || UNI(唯一) |
| Sname | 学生姓名 | varchar(10) | 否 | 无 |
| sex | 学生性别 | varchar(1) | 否 | 无 |
| age | 学生年龄 | int | 否 | 无 |
| address | 学生住址 | varchar(100) | 否 | 无 |
| phone | 学生电话 | varchar(11) | 否 | 无 |

## 🔌 API

> 返回的数据一定会有`code`
>
> 成功会返回`code: 0`
>
> 失败会返回`code: -1`

返回数据的示例
``` jsonc
// 登录成功返回的数据
{
    code: 0,
    data: {
        token: "FAygMZ7fRMV8Q6O3xLGHRfmQrGAQRArZJ7T5tJ2dZn9T72nZ9N",
        username: "test"
        },
    message: "登录成功"
}
```

| 请求方式 | url                   | 返回数据(data)                                       | 功能 |
| ---- | ----                   | ----                                            | ---- |
| post | /api/login             | token, username                                 | 登录 |
| post | /api/signIn            |                                                 | 注册 |
| post | /api/token             |                                                 | token验证 |
| get  | /api/student           | id, class, num, Sname, sex, age, address, phone | 获取学生列表数据 |
| post | /api/student/delete    |                                                 | 删除学生数据 |
| post | /api/student/new       |                                                 | 新建学生数据 |
| post | /api/student/update    |                                                 | 更新学生数据
| post | /api/users             | id, username, passwd, isroot, islogin           | 获取用户列表(带用户密码) |
| get  | /api/users             | id , username, isroot, islogin                  | 获取用户列表(不带用户密码) |
| post | /api/users/permissions |                                                 | 更新用户权限 |
| post | /api/users/loginState  |                                                 | 更新用户登录状态 |
| post | /api/users/delete      |                                                 | 删除用户 |
| post | /api/users/add         |                                                 | 添加用户 |
| post | /api/user/passwd       |                                                 | 用户修改密码 |
| post | /api/user/username     |                                                 | 用户修改用户名 |
| get  | /api/test              | root用户的密码                                       | 测试接口(**测试完后一定要注释掉**) | 

| 参数名 | 类型 | 备注 |
| ---- | ---- | ---- |
| token | string | root用户token中会有"[root]"，管理员会有"[sudo]" |
| username | string | 不可重复，重复返回`message: "用户名已被占用"` |
| id | number |
| class | string |
| num | string | 不可重复，重复返回`message: "该学号已存在"` |
| Sname | string |
| sex | string |
| age | number |
| address | string |
| phone | string |
| passwd | string |
| isroot | boolean |
| islogin | boolean |