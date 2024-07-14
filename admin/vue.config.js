const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/avataruploads': { // 这里的路径前缀匹配你请求图片时使用的路径前缀，可以根据实际情况调整
        target: 'http://127.0.0.1:8089', // 后端服务器地址
        changeOrigin: true, // 是否改变源，一般设置为true
        // pathRewrite: { '^/api': '' } // 可以根据需要重写路径
      }
    }
  }
};