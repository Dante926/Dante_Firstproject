// Web产品路由模块
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const WebProductHandler = require('../router_handler/webproduct')

// 新闻模块
router.get('/list',WebProductHandler.list)

module.exports = router