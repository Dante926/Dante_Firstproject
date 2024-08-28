// 新闻路由模块
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const WebNewsHandler = require('../router_handler/webnews')

// 新闻模块
router.get('/list', WebNewsHandler.list)
router.get('/list/:id', WebNewsHandler.list)
router.get('/toplist', WebNewsHandler.toplist)// 最新数据新闻
router.post('/getsearch', WebNewsHandler.getsearch)// 微信小程序端获取搜索历史

module.exports = router