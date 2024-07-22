# admin

## Project setup
```因为上传原因所以不上传node_modules，请运行项目时在终端中执行以下指令
npm install
```

### Compiles and hot-reloads for development
```运行前端项目指令
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 项目部署上线说明
```
    1.使用宝塔面板一件上传文件：
    2.在每个前端项目的vvue.config.js配置文件中更改运行端口
    module.exports = {
        devServer: {
        port: 8081,
        }
    };
    3.更改数据库配置
    const db = mysql.createPool({
    host: '8.134.110.209',          //公网ip地址
    user: 'bin',                    //数据库用户名
    password: 'GLwPnZDjP2fjh5My',   //数据库密码
    database: 'bin',                //数据库名
    });
    4.前端项目的请求接口也要更改为对应的ip地址
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
