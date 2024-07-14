const db = require('../db/index');
const JWT = require('../util/JWT');

const newsHandler = {
    addproduct: (req, res) => {
        // 封面图片处理
        const cover = req.file ? `/productuploads/${req.file.filename}` : '';
        // 其他数据处理
        const { title, introduction, detail, username } = req.body
        // 生成时间戳
        const editTime = new Date();
        // 数据库操作
        const sqlStr = 'insert into product(title,introduction,detail,cover,editTime,username) values(?,?,?,?,?,?)';
        db.query(sqlStr, [title, introduction, detail, cover, editTime, username], (err, results) => {
            if (err) return res.send({ ActionType: "Error", message: '添加产品失败:' + err.message })
            return res.send({
                ActionType: "OK",
                date: {
                    title: title,
                    introduction: introduction,
                    detail: detail,
                    cover: cover,
                    editTime: editTime,
                    username: username,
                },
                message: '添加产品成功...',
            })

        })
    },

    getlist: (req, res) => {
        if (req.params.id) {
            const sqlStr = 'select * from product where id=?'
            db.query(sqlStr, req.params.id, (err, results) => {
                if (err || results.length !== 1) return res.send({
                    ActionType: "Error",
                    message: '获取新闻列表失败' + err.message
                })
                return res.send({
                    ActionType: "OK",
                    message: '获取新闻成功',
                    data: results[0]
                })
            })
        } else {
            const sqlStr = 'select * from product'
            db.query(sqlStr, (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '列表获取失败' + err.message })
                return res.send({ ActionType: "OK", data: results, message: '获取新闻列表成功' })
            })
        }
    },

    delproduct: (req, res) => {
        const sqlStr = 'delete from product where id=?'
        db.query(sqlStr, req.params.id, (err, results) => {
            if (err) return res.send({ ActionType: "Error", message: '删除新闻失败' + err.message })
            if (results.affectedRows !== 1) return res.send({ ActionType: "Error", message: '删除新闻失败' })
            return res.send({ ActionType: "OK", message: '删除新闻成功' })
        })
    },

    update: (req, res) => {
        // 数据处理
        const cover = req.file ? `/productuploads/${req.file.filename}` : '';
        const { title, introduction, detail, id } = req.body
        const editTime = new Date();
        // 如果更新cover
        if (cover) {
            // 数据库操作
            const sqlStr = 'UPDATE product SET title = ?, introduction = ?, detail = ?, cover = ? , editTime = ? WHERE id = ?';
            db.query(sqlStr, [title, introduction, detail, cover, editTime, id], (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '更新失败:' + err.message })
                // 如果数据库响应成功
                return res.send({
                    ActionType: "OK",
                    date: {
                        title: title,
                        introduction: introduction,
                        detail: detail,
                        cover: cover,
                        editTime: editTime,
                    },
                    message: '更新成功...',
                })
            })
        } else {
            // 数据库操作
            const sqlStr = 'UPDATE product SET title = ?, introduction = ?, detail = ?, editTime = ? WHERE id = ?';
            db.query(sqlStr, [title, introduction, detail, editTime, id], (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '更新失败:' + err.message })
                // 如果数据库响应成功
                return res.send({
                    ActionType: "OK",
                    date: {
                        title: title,
                        introduction: introduction,
                        detail: detail,
                        editTime: editTime,
                    },
                    message: '更新成功...',
                })

            })
        }
    },
}
module.exports = newsHandler
