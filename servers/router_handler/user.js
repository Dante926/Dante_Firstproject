// 抽离用户路由模块中的处理函数
/* 
    目的：保证路由模块的纯粹性，所有路由处理函数，必须抽离到对应的路由处理函数模块中
*/

// 导入数据库操作模块
const { date } = require('joi');
const db = require('../db/index');
const JWT = require('../util/JWT');


// 个人信息更新处理函数
const userHandler = {
    login: async (req, res) => {
        const userinfo = req.body
        const sqlStr = 'select * from user where username = ?'
        db.query(sqlStr, userinfo.username, (err, results) => {
            if (err) return res.send({ status: 1, message: err.message })
            if (results.length !== 1) return res.send({ status: 1, message: '用户名不存在' })
            if (userinfo.password !== results[0].password) {
                return res.send({ status: 1, message: '密码错误' })
            }

            // 生成token
            res.setHeader('Access-Control-Expose-Headers', 'Authorization')// 允许跨域访问请求头中的token
            const token = JWT.generate({
                id: results[0].id,
                username: results[0].username
            }, '1d')
            res.header("Authorization", token)
            return res.send({
                status: 0,
                message: 'OK',
                data: {
                    username: results[0].username,
                    gender: results[0].gender ? results[0].gender : 0, // 0保密 1男 2女
                    introduction: results[0].introduction,//简介
                    avatar: results[0].avatar,
                    role: results[0].role,//0普通用户 1管理员
                }
            })
        })
    },

    uploads: (req, res) => {
        // 如果文件上传成功
        if (req) {
            // console.log(req.file);
            // 解构数据
            const { username, introduction, gender } = req.body
            const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
            //获取id
            const token = req.headers.authorization.split(' ')[1];// 将token单独分离出来
            const payload = JWT.verify(token);
            const id = payload.id
            // console.log(username, introduction, gender, avatar, id);

            // 数据库操作
            if (avatar) {
                const sqlStr = 'update user set username = ?, avatar = ?,introduction = ?,gender = ? where id = ?'
                db.query(sqlStr, [username, avatar, introduction, gender, id], (err, results) => {
                    if (err) return res.send({ status: 1, message: err.message })
                    if (results.affectedRows !== 1) return res.send({ status: 1, message: '更新失败' })
                    res.send({
                        status: 0,
                        message: '上传成功...',
                        ActionType: "OK",
                        date: {
                            username: username,
                            gender: Number(gender),
                            introduction: introduction,//简介
                            avatar: avatar,
                        }
                    })
                })
            } else {
                const sqlStr = 'update user set username = ?,introduction = ?,gender = ? where id = ?'
                db.query(sqlStr, [username, introduction, gender, id], (err, results) => {
                    if (err) return res.send({ ActionType: 'Error', message: '用户名或已存在...' })
                    if (results.affectedRows !== 1) return res.send({ status: 1, message: '更新失败' })
                    res.send({
                        status: 0,
                        message: '上传成功...',
                        ActionType: "OK",
                        date: {
                            username: username,
                            gender: Number(gender),
                            introduction: introduction,//简介
                        }
                    })
                })
            }

        }
        else {
            res.send({
                status: 1,
                message: '上传失败...'
            })
        }

    },

    adduser: (req, res) => {
        // 如果文件上传成功
        if (req) {
            // console.log(req.file);
            // 解构数据
            const { username, password, gender, role, introduction } = req.body
            // 判断账号是否重复
            const sqlStr = 'select * from user where username=?'
            db.query(sqlStr, username, (err, result) => {
                if (err) {
                    // 处理错误，例如记录错误或向客户端发送错误响应
                    console.error('检查用户名时出错:', err);
                    return res.send({
                        message: '检查用户名时出错...',
                        ActionType: "Error",
                    })
                }

                if (result.length > 0) {
                    // 用户名已存在
                    return res.send({
                        message: '添加失败...',
                        ActionType: "Error",
                    })
                } else {
                    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
                    /*  获取id
                     const token = req.headers.authorization.split(' ')[1];// 将token单独分离出来
                     const payload = JWT.verify(token);
                     const id = payload.id
                     console.log(username, introduction, gender, avatar, id); 
                    */
                    // 数据库操作
                    if (avatar) {
                        const sqlStr = 'INSERT INTO user (username, password, gender, role, avatar, introduction) VALUES (?, ?, ?, ?, ?, ?)';
                        db.query(sqlStr, [username, password, gender, role, avatar, introduction], (err, results) => {
                            if (err) return res.send({ status: 1, message: err.message })
                            if (results.affectedRows !== 1) return res.send({ status: 1, message: '添加失败(avatar1)...' })
                            res.send({
                                status: 0,
                                message: '添加成功...',
                                ActionType: "OK",
                                date: {
                                    username: username,
                                    password: password,
                                    gender: Number(gender),
                                    role: Number(role),
                                    avatar: avatar,
                                    introduction: introduction,//简介
                                }
                            })
                        })
                    } else {
                        const sqlStr = 'INSERT INTO user (username, password, gender, role, introduction) VALUES (?, ?, ?, ?, ?)';
                        db.query(sqlStr, [username, password, gender, role, introduction], (err, results) => {
                            if (err) return res.send({ status: 1, message: err.message })
                            if (results.affectedRows !== 1) return res.send({ status: 1, message: '添加失败(avatar2)...' })
                            res.send({
                                status: 0,
                                message: '添加成功...',
                                ActionType: "OK",
                                date: {
                                    username: username,
                                    password: password,
                                    gender: Number(gender),
                                    role: Number(role),
                                    introduction: introduction,//简介
                                }
                            })
                        })
                    }
                }
            })


        }
        else {
            res.send({
                status: 1,
                message: '上传失败...'
            })
        }

    },

    getuserlist: (req, res) => {
        // 查询所有信息，包括password
        const sqlStr = 'SELECT * FROM user';
        db.query(sqlStr, (err, results) => {
            if (err) return res.send({ ActionType: "Error", message: err.message });

            // 移除每个结果对象中的password字段
            const safeResults = results.map(result => {
                delete result.password; // 删除password字段
                return result;
            });

            res.send({
                ActionType: "OK",
                message: '获取用户列表成功',
                data: safeResults
            });
        });
    },

    deluserlist: (req, res) => {
        // console.log(req.params.id);
        if (req.params.id == 1) {
            return res.send({
                ActionType: "FAIL!!!",
                message: '超级管理员不可删除...',

            });
        } else {
            const sqlStr = 'delete from user where id = ?'
            db.query(sqlStr, req.params.id, (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: err.message });
                res.send({
                    ActionType: "OK",
                    message: '删除用户成功',
                });
            })
        }
    },

    putuserlist: (req, res) => {
        // console.log(req.body.id);
        if (req.body) {
            // 解构
            const { username, password, role, introduction, id } = req.body
            // 验证用户名是否重复
            const sqlStr = 'select username from user where username=?'
            db.query(sqlStr, username, (err, results) => {
                if (err) return res.send(err.message)
                if (results.length === 1) {
                    return res.send({
                        ActionType: "Error",
                        message: '用户名重复请重试...'
                    })
                } else {
                    // 更新用户信息
                    const sqlStr = 'UPDATE user SET username=?, password=?, role=?, introduction=? where id =?'
                    db.query(sqlStr, [username, password, role, introduction, id], (err, results) => {
                        if (err) return res.send(err.message)
                        // 判断是否更新成功
                        if (results.affectedRows === 1) {
                            return res.send({
                                ActionType: "OK",
                                message: '修改成功'
                            })
                        } else {
                            return res.send({
                                ActionType: "Error",
                                message: '修改失败'
                            })
                        }
                    })
                }

            })
        }
    },

}
module.exports = userHandler