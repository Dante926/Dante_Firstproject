const db = require('../db/index');

const WebProductHandler = {
    list: (req, res) => {
        if (req.params.id) {
            const sqlStr = 'select * from product where id=? ORDER BY editTime DESC '
            db.query(sqlStr, req.params.id, (err, results) => {
                if (err || results.length !== 1) return res.send({
                    ActionType: "Error",
                    message: '获取产品列表失败' + err.message
                })
                return res.send({
                    ActionType: "OK",
                    message: '获取产品列表成功',
                    data: results[0]
                })
            })
        } else {
            const sqlStr = 'SELECT * FROM product ORDER BY editTime DESC'
            db.query(sqlStr, (err, results) => {
                if (err) return res.send({ ActionType: "Error", message: '获取产品列表失败' + err.message })
                res.send({ ActionType: "OK", data: results, message: '获取产品列表成功' })
            })
        }
    },

}
module.exports = WebProductHandler
