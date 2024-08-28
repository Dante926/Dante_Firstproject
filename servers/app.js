// 项目入口文件
const express = require('express');
const app = express();

// 跨域中间件
const cors = require('cors');
app.use(cors());

// 解析表单数据中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));// 只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(bodyParser.json());
// 导入文件操作模块
const fs = require('fs');
const path = require('path');
// 验证模块
const JWT = require('./util/JWT');

// 导入并注册用户路由模块
const userRouter = require('./router/user');
// 导入新闻路由模块
const newsRouter = require('./router/news');
// 导入产品路由模块
const productRouter = require('./router/product');
// 导入web新闻路由模块
const newsapiRouter = require('./router/NewsRouter');
// 导入web产品路由模块
const productapiRouter = require('./router/WebProduct');

// 获取图片中间件
app.get('/avataruploads/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const filePath = path.join(__dirname, 'public', 'avataruploads', `${fileId}`); // 假设图片文件名就是fileId，没有特定的文件扩展名
    // console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 如果文件读取失败，可能是文件不存在或路径错误
            console.error(err);
            res.status(404).send('Image not found');
        } else {
            // 文件读取成功，将二进制数据作为响应返回
            // 注意：此处没有显式设置Content-Type，因为大多数浏览器能够根据二进制数据推断出正确的MIME类型
            return res.send(data);
        }
    })
})
app.get('/newsuploads/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const filePath = path.join(__dirname, 'public', 'newsuploads', `${fileId}`); // 假设图片文件名就是fileId，没有特定的文件扩展名
    // console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Image not found');
        } else {
            return res.send(data);
        }
    })
})
app.get('/productuploads/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const filePath = path.join(__dirname, 'public', 'productuploads', `${fileId}`); // 假设图片文件名就是fileId，没有特定的文件扩展名
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(404).send('Image not found');
        } else {
            return res.send(data);
        }
    })
})

// web前端路由
app.use('/webapi/news', newsapiRouter); // web新闻管理路由(包含一部分微信小程序端)
app.use('/webapi/product', productapiRouter); // web产品管理路由


// 拦截路由中间件
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Authorization')// 允许跨域访问请求头中的token
    // 排除登录和注册接口
    if (req.url === "/api/user/login") {
        // 如果不是登录和注册接口，则放行
        next();
        return;
    }

    //如果token有效则放行
    const _authorization = req.headers.authorization;
    const token = _authorization.split(' ')[1];// 将token单独分离出来
    const payload = JWT.verify(token);
    if (payload) {
        const newToken = JWT.generate({
            // 将id和username重新生成token
            id: payload.id,
            username: payload.username
        }, '1d');
        res.header("authorization", newToken)
        next();
    } else {
        return res.status(401).send({
            status: 401,
            message: 'token已过期,请重新登录...'
        })
    }
});

app.use('/api/user', userRouter); //用户管理路由
app.use('/api/news', newsRouter); //新闻管理路由
app.use('/api/product', productRouter); //新闻管理路由
// 启动服务器
app.listen(8089, () => {
    console.log('Server running at http://127.0.0.1:8089');
})