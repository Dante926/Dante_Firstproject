const db = require('../db/index');

const WebNewsHandler = {
    // 获取新闻列表
    list: (req, res) => {

        // 小程序端分类type------------
        const { type } = req.query
        const category = Number(type)
        // ----------------------------

        if (type) {
            // 小程序端请求
            if (category === 0) {
                const sqlStr = 'SELECT * FROM news ORDER BY editTime DESC'
                db.query(sqlStr, [category], (err, results) => {
                    if (err) return res.send({ ActionType: "Error", message: '列表获取失败' + err.message })
                    res.send({ ActionType: "OK", data: results, message: '获取新闻列表成功' })
                })
            } else {
                const sqlStr = 'SELECT * FROM news WHERE isPublish = "1" AND category = ?  ORDER BY editTime DESC'
                db.query(sqlStr, [category], (err, results) => {
                    if (err) return res.send({ ActionType: "Error", message: '列表获取失败' + err.message })
                    res.send({ ActionType: "OK", data: results, message: '获取新闻列表成功' })
                })
            }
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

    // 微信小程序查询是否存在收藏接口
    exitcollection: (req, res) => {
        const { id, openid } = req.body
        // 根据id和openid查询是否被收藏
        const sqlStr = `SELECT * FROM collection WHERE id = ? AND openid = ?`
        db.query(sqlStr, [id, openid], (err, result) => {
            // 查询出错
            if (err) return res.send({
                status: 500,
                message: '查询失败'
            })
            if (result.length === 0) {
                return res.send({
                    message: '未收藏'
                })
            } else {
                return res.send({
                    message: '已收藏'
                })
            }

        })
    },

    // 收藏and取消收藏
    ifcollection: (req, res) => {
        const { id, openid, category } = req.body
        // 根据id和openid查询是否存在收藏表中
        const sqlStr = `SELECT * FROM collection WHERE id = ? AND openid = ?`
        db.query(sqlStr, [id, openid], (err, result) => {
            // 查询出错
            if (err) return res.send({
                status: 500,
                message: '查询失败'
            })
            // 查询结果为空，说明没有收藏，则添加收藏
            if (result.length === 0) {
                const sqlStr = `INSERT INTO collection (id, openid,category) VALUES (?, ?, ?)`
                db.query(sqlStr, [id, openid, category], (err, result) => {
                    // 添加收藏失败
                    if (err) return res.send({
                        status: 500,
                        message: '添加收藏失败'
                    })
                    // 添加收藏成功
                    return res.send({
                        status: 200,
                        message: '添加收藏成功'
                    })
                })
                // 存在收藏，则取消收藏
            } else {
                const sqlStr = `DELETE FROM collection WHERE id = ? AND openid = ?`
                db.query(sqlStr, [id, openid], (err, result) => {
                    if (err) return res.send({
                        status: 500,
                        message: '取消收藏失败'
                    })
                    return res.send({
                        status: 200,
                        message: '取消收藏成功'
                    })
                })
            }
        })

    },

    // 个人收藏获取新闻列表接口
    personcol: (req, res) => {
        const { category, openid } = req.body
        // category为0时，获取所有新闻列表
        if (category == 0) {
            const sqlStr = `SELECT * FROM collection WHERE openid = ?`
            db.query(sqlStr, [openid], (err, result) => {
                // 查询出错
                if (err) return res.send({
                    status: 500,
                    message: '查询失败'
                })
                // 查询结果不为空，根据返回的id 查询user新闻列表 (多重查询)
                if (result.length !== 0) {
                    const sqlStr = `SELECT * FROM news WHERE id IN (?)`
                    db.query(sqlStr, [result.map(item => item.id)], (err, result) => {
                        // 查询出错
                        if (err) return res.send({
                            status: 500,
                            message: '查询失败'
                        })
                        // 查询结果不为空，返回新闻列表
                        if (result.length !== 0) {
                            return res.send({
                                status: 200,
                                message: '查询成功',
                                data: result
                            })
                        }
                    })
                }
            })
        } else {
            // 根据category查询不同类别的新闻列表
            const sqlStr = `SELECT * FROM collection WHERE openid = ? AND category = ?`
            db.query(sqlStr, [openid, category], (err, result) => {
                // 查询出错
                if (err) return res.send({
                    status: 500,
                    message: '查询失败'
                })
                // 查询结果不为空，根据返回的id 查询user新闻列表 (多重查询)
                if (result.length !== 0) {
                    const sqlStr = `SELECT * FROM news WHERE id IN (?)`
                    db.query(sqlStr, [result.map(item => item.id)], (err, result) => {
                        // 查询出错
                        if (err) return res.send({
                            status: 500,
                            message: '查询失败'
                        })
                        // 查询结果不为空，返回新闻列表
                        if (result.length !== 0) {
                            return res.send({
                                status: 200,
                                message: '查询成功',
                                data: result
                            })
                        }
                    })
                }
            })
        }
    }
}
module.exports = WebNewsHandler
