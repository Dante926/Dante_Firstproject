// 注册&&登入 用户路由模块
const express = require('express')
const router = express.Router()

// 图片上传模块
const multer = require('multer')
const upload = multer({dest:'public/avataruploads/'})

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')//这是黑马老师自己封装的一个中间件，其功能是自动帮我们把接收到的数据进行我们自己定义的规则验证

// 导入验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户且登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
// 用户更新内容
router.post('/uploads', upload.single('file'), userHandler.uploads)
// 添加用户
router.post('/adduser', upload.single('file'), userHandler.adduser)

// 获取用户列表 and 增删改查
router.get('/getuserlist', userHandler.getuserlist)
router.delete('/getuserlist/:id', userHandler.deluserlist)
router.put('/putuserlist/:id', userHandler.putuserlist)
// 暴露对象
module.exports = router