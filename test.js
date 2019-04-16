const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'

console.log(process.env.NODE_ENV);

/*module.exports = {
    baseUrl: BASE_URL,
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

        config.module
            .rule('vue')
            .use('iview-loader')
            .loader('iview-loader')
            .tap(options => {
                return { prefix: false }
            })

    },
    productionSourceMap: true,
    devServer: {
        proxy: {
            '/server': {
                target: 'http://www.dspnew.com',
                changeOrigin: true,
                pathRewrite: {
                    '/server': '/'
                }
            }
        },
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }

}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/css/index.less'),
            ],
        })
}*/
