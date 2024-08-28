const db = require('../db/index');

const WebNewsHandler = {
    // 获取新闻列表
    list: (req, res) => {

        // 小程序端分类type------------
        const { type } = req.query
        const category = Number(type) + 1
        // ----------------------------

        if (type) {
            // 小程序端请求
            const sqlStr = 'SELECT * FROM news WHERE isPublish = "1" AND category = ?  ORDER BY editTime DESC'
            db.query(sqlStr, [category], (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '列表获取失败' + err.message })
                res.send({ ActionType: "OK", data: results, message: '获取新闻列表成功' })
            })
        } else {
            // WEB端请求
            if (req.params.id) {
                const sqlStr = 'select * from news where id=? and isPublish = "1" ORDER BY editTime DESC '
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
                const sqlStr = 'SELECT * FROM news WHERE isPublish = "1" ORDER BY editTime DESC'
                db.query(sqlStr, (err, results) => {
                    if (err) return res.send({ ActionType: "Error", message: '列表获取失败' + err.message })
                    res.send({ ActionType: "OK", data: results, message: '获取新闻列表成功' })
                })
            }
        }


    },

    // 获取最新四条新闻列表
    toplist: (req, res) => {
        // Get query parameter
        const { limit } = req.query;

        // Check if limit parameter is present
        if (limit) {
            const sqlStr = 'SELECT * FROM news WHERE isPublish = ? ORDER BY editTime DESC LIMIT ?';
            const isPublish = 1; // Assuming isPublish is a boolean flag in the database

            db.query(sqlStr, [isPublish, parseInt(limit)], (err, results) => {
                if (err) {
                    console.error('Failed to retrieve list', err.message);
                    return res.status(500).json({ ActionType: "Error", message: 'Failed to retrieve list' });
                }
                res.json({ ActionType: "OK", data: results, message: 'Successfully retrieved news list' });
            });
        } else {
            res.status(400).json({ ActionType: "Error", message: 'Missing limit parameter' });
        }
    },

    // 微信小程序端获取搜索历史
    getsearch: (req, res) => {
        const { name } = req.body;
        console.log(name);
        // console.log(req.body);
        const sqlStr = `SELECT * FROM news WHERE title LIKE ?`
        db.query(sqlStr, [`%${name}%`], (err, result) => {
            if (err) {
                return res.send({
                    status: 500,
                    message: '获取数据失败'
                })
            }
            return res.send({
                data: result
            })
        })
    },
}
module.exports = WebNewsHandler
