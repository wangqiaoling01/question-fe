module.exports = {
    webpack: {
        configure(webpackConfig) {
            if (webpackConfig.mode === 'production') {
                // 抽离公共代码，只在生产环境
                if (webpackConfig.optimization == null) {
                    webpackConfig.optimization = {}
                }
                webpackConfig.optimization.splitChunks = {
                    // 对所有的包都使用
                    chunks: 'all',
                    cacheGroups: {
                        antd: {
                            name: 'antd-chunk',
                            test: /antd/,
                            // 权限越高，优先级越高，越优先匹配
                            priority: 100,
                        },
                        reactDom: {
                            name: 'reactDom-chunk',
                            test: /react-dom/,
                            priority: 99,
                        },
                        // 所有的第三方库都引自 node_modules
                        vendors: {
                            name: 'vendors-chunk',
                            test: /node_modules/,
                            priority: 98,
                        },
                    },
                }
            }
            return webpackConfig
        },
    },
    devServer: {
        port: 8000,
        proxy: {
            '/api': 'http://localhost:3333',
        },
    },
}
