// 新闻路由模块
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const WebNewsHandler = require('../router_handler/webnews')

router.get('/list',WebNewsHandler.list)
router.get('/list/:id',WebNewsHandler.list)
// 最新数据新闻
router.get('/toplist',WebNewsHandler.toplist)

module.exports = router