const isProduction = true;
const path=require('path');
const resolve = dir => path.join(__dirname, dir);
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