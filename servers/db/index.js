// 定义模块中创建数据库的连接对象
// 导入mysql模块
const mysql = require('mysql');

const db= mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'company-system',
})

// 测试连接
/* db.query('select * from user',(err,results)=>{
    if(err) return console.log(err.message);
    console.log(results);
}) */

module.exports = db;