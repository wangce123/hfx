const webpack = require('webpack')
module.exports = {
    //打包路劲
    publicPath: './',
    //取消eslint规范
    lintOnSave: false,
    //配置post2css 这里配置1rem = 37.5px
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({//这里是配置项，详见官方文档
                        rootValue: 37.5, // 换算的基数
                        selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    devServer: {
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        // port: 8091,
        proxy: {
            '^/huisharingadmin': {   // 拦截 以/admin开头的 相对 url请求, 并且在前面自动拼接 target的目标地址 
                // target: `http://www.loveenglishbook.com:8083`,
                target: `http://121.41.118.230:8091`,
                changeOrigin: true,  // 允许跨域? true
                pathRewrite: {
                }
            },
        }
    }
}