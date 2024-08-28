const db = require('../db/index');
const JWT = require('../util/JWT');

const newsHandler = {
    addnews: (req, res) => {
        console.log(req.file, req.body);
        // 封面图片处理
        const cover = req.file ? `/newsuploads/${req.file.filename}` : '';
        // 其他数据处理
        const { title, content, category, isPublish, username, call} = req.body
        // 生成时间戳
        const editTime = new Date();
        // 数据库操作
        const sqlStr = 'insert into news(title,content,category,cover,isPublish,editTime,username,`call`) values(?,?,?,?,?,?,?,?)';
        db.query(sqlStr, [title, content, category, cover, isPublish, editTime, username,call], (err, results) => {
            if (err) return res.send({ ActionType: "Error", message: err.message })
            // 如果数据库响应成功
            res.send({
                ActionType: "OK",
                // data: results,
                date: {
                    title: title,
                    content: content,
                    category: Number(category),
                    cover: cover,
                    isPublish: Number(isPublish),
                    editTime: editTime,
                },
                message: '添加成功',
            })

        })
        /* res.send({
            ActionType: "OK",
            message: '添加新闻成功',
            data: req.body
        }) */
    },

    getnewslist: (req, res) => {
        if (req.params.id) {
            // console.log(req.params.id);
            const sqlStr = 'select * from news where id=?'
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
            const sqlStr = 'select * from news'
            db.query(sqlStr, (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '列表获取失败' + err.message })
                res.send({ ActionType: "OK", data: results, message: '获取新闻列表成功' })
            })
        }
    },

    putnewslist: (req, res) => {
        const { id, isPublish } = req.body
        // 更新修改时间
        const editTime = new Date();
        const sqlStr = 'update news set isPublish=?,editTime=? where id=?'
        db.query(sqlStr, [isPublish, editTime, id], (err, results) => {
            if (err) return res.send({ ActionType: "Error", message: '修改失败' + err.message })
            return res.send({ ActionType: "OK", message: "修改成功" })
        })
    },

    deletenews: (req, res) => {
        const { id } = req.params
        if (id) {
            const sqlStr = 'delete from news where id=?'
            db.query(sqlStr, [id], (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '删除失败' + err.message })
                return res.send({ ActionType: "OK", message: "删除成功..." })
            })
        } else {
            return res.send({ ActionType: "Error", message: "删除参数错误..." })
        }
    },

    updatelist: (req, res) => {
        // 数据处理
        const cover = req.file ? `/newsuploads/${req.file.filename}` : '';
        const { title, content, category, isPublish, id } = req.body
        const editTime = new Date();

        // 如果更新cober
        if (cover) {
            // 数据库操作
            const sqlStr = 'UPDATE news SET title = ?, content = ?, category = ?, cover = ?, isPublish = ?, editTime = ? WHERE id = ?';
            db.query(sqlStr, [title, content, category, cover, isPublish, editTime, id], (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: err.message })
                // 如果数据库响应成功
                res.send({
                    ActionType: "OK",
                    date: {
                        title: title,
                        content: content,
                        category: Number(category),
                        cover: cover,
                        isPublish: Number(isPublish),
                        editTime: editTime,
                    },
                    message: '更新成功...',
                })

            })
        } else {
            // 数据库操作
            const sqlStr = 'UPDATE news SET title = ?, content = ?, category = ?, isPublish = ?, editTime = ? WHERE id = ?';
            db.query(sqlStr, [title, content, category, isPublish, editTime, id], (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: err.message })
                // 如果数据库响应成功
                res.send({
                    ActionType: "OK",
                    date: {
                        title: title,
                        content: content,
                        category: Number(category),
                        isPublish: Number(isPublish),
                        editTime: editTime,
                    },
                    message: '更新成功...',
                })

            })
        }
    },

    getperlist: (req, res) => {
        if (req.params.username) {
            // console.log(req.params.username);
            const sqlStr = 'select * from news where username=?'
            db.query(sqlStr, req.params.username, (err, results) => {
                if (err) return res.send({
                    ActionType: "Error",
                    message: '获取新闻列表失败' + err.message
                })
                return res.send({
                    ActionType: "OK",
                    message: '获取新闻成功',
                    data: results
                })
            })
        }
        else {
            return res.send({
                ActionType: "Error",
                message: '获取新闻列表失败'
            })
        }
    },
}
module.exports = newsHandler
