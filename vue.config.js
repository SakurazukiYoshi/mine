const isProduction = true;
const cdn = {
    css: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    js: [
        'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    ]
};
module.exports = {
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
                })
        }
    }
}