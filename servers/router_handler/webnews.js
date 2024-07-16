const db = require('../db/index');

const WebNewsHandler = {
    list: (req, res) => {
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
}
module.exports = WebNewsHandler
