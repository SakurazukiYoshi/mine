const isProduction = true;
const path=require('path');
const resolve = dir => path.join(__dirname, dir);


// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzip = true // 是否使用gzip
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
// gzip --end



const cdn = {
    css: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: [
        'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    ]
};
module.exports = {
    lintOnSave: true,
    configureWebpack: config => {
        if (isProduction) {
            config.externals = {
                'axios':'axios'
            }
        }
        // gzip
        // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
        config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        }))
    },
    chainWebpack: config => {
        if (isProduction) {
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn;
                    return args;
                });
            config.resolve.alias
                //.set('_c', resolve('src/components'))
                .set('_c', '@/components')
        }
    }
}