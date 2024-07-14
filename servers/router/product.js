// 新闻路由模块
const express = require('express')
const router = express.Router()

// 图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

// 导入用户路由处理函数模块
const productHandler = require('../router_handler/product')

// 添加产品
router.post('/addproduct', upload.single('file'), productHandler.addproduct)
// 获取产品列表&&编辑产品
router.get('/getlist', productHandler.getlist)
router.get('/getlist/:id', productHandler.getlist)
// 删除产品
router.delete('/delproduct/:id', productHandler.delproduct)
// 更新产品
router.post('/update', upload.single('file'), productHandler.update)


module.exports = router