const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8088',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }),
        createProxyMiddleware('/oneApi/one', {
            target: 'https://v1.hitokoto.cn/',
            changeOrigin: true,
            pathRewrite: {
                '^/oneApi/one': ''
            }
        }),
        createProxyMiddleware('/oneImageApi/one', {
            target: 'https://tuapi.eees.cc/api.php',
            changeOrigin: true,
            pathRewrite: {
                '^/oneImageApi/one': ''
            }
        }),

    )
}