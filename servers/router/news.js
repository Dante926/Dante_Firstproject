// 新闻路由模块
const express = require('express')
const router = express.Router()

// 图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

// 导入用户路由处理函数模块
const newsHandler = require('../router_handler/news')

// 添加新闻
router.post('/addnew', upload.single('file'), newsHandler.addnews)
// 获取新闻列表
router.get('/getnewslist', newsHandler.getnewslist)
// 修改是否发布状态
router.put('/publish', newsHandler.putnewslist)
// 删除新闻
router.delete('/deletenews/:id', newsHandler.deletenews)
// 更新新闻
router.get('/getnewslist/:id', newsHandler.getnewslist) // 跟新内容前获取当前修改新闻的内容
router.post('/updatelist', upload.single('file'), newsHandler.updatelist)
// 用户个人发布的列表
router.get('/getperlist/:username', newsHandler.getperlist) // 跟新内容前获取当前修改新闻的内容
module.exports = router