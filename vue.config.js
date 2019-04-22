const isProduction = true;
const path=require('path');

//转化为绝对路径
const resolve = dir => path.join(__dirname, dir);

const LessglobalVars=require(resolve('src/assets/js/color.js'));




// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzip = true;  // 是否使用gzip
const productionGzipExtensions = ['js', 'css']; // 需要gzip压缩的文件后缀
// gzip --end



const cdn = {
    css: [
        'https://unpkg.com/iview/dist/styles/iview.css'
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
                    //html-webpack-plugin 使用 html-minifier
/*                    args[0].minify={
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        minifyCSS: true // 压缩内联的 CSS
                    };*/
                    return args;
                });
            config.resolve.alias
                .set('_c', resolve('src/components'))
        }


/*        //引入全局的less变量
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));*/
    },
/*    devServer: {
        proxy: {
            '/server': {
                target: 'http://www.dspnew.com',
                changeOrigin: true,
                pathRewrite: {
                    '/server': '/'
                }
            }
        },
    },*/
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
                globalVars:LessglobalVars
            },
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~@/assets/css/color.scss";`
            }
        },
        //css单独分离,需要热更新此处设置成false
        //extract: true,
    }
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, 'src/assets/test/global.scss'), // 需要全局导入的less
            ],
        })
}
