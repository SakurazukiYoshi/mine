const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            title:'', //生成html文件的标题
            filename: 'index.html', //就是html文件的文件名，默认是index.html
            template: 'index.html',//指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等。但是要注意的是，如果想使用自定义的模板文件的时候，你需要安装对应的loader哦。
            inject: 'head',
            /*
            * inject有四个值： true body head false
                true 默认值，script标签位于html文件的 body 底部
                body script标签位于html文件的 body 底部
                head script标签位于html文件的 head中
                false 不插入生成的js文件，这个几乎不会用到的
            *
            * */


            templateParameters: 'head',
            favicon: 'path/to/my_favicon.ico',  //给你生成的html文件生成一个 favicon ,值是一个路径
            meta: 'head',
            base: 'head',
            minify: false,//使用minify会对生成的html文件进行压缩。默认是false。html-webpack-plugin内部集成了 html-minifier,因此，还可以对minify进行配置：（注意，虽然minify支持BooleanObject,但是不能直接这样写：minify: true , 这样会报错 ERROR in TypeError: Cannot use 'in' operator to search for 'html5' in true , 使用时候必须给定一个 { } 对象 ）
            hash: 'head',
            showErrors: true,  //当webpack报错的时候，会把错误信息包裹再一个pre中，默认是true。
            chunks: 'head',  //chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
            /*
                    entry: {
                        index: path.resolve(__dirname, './src/index.js'),
                        devor: path.resolve(__dirname, './src/devor.js'),
                        main: path.resolve(__dirname, './src/main.js')
                    }
                    plugins: [
                        new httpWebpackPlugin({
                            chunks: ['index','main']
                        })
                    ]
            * */

            chunksSortMode: 'auto',
            /*
                script的顺序，默认四个选项： none auto dependency {function}

                'dependency' 不用说，按照不同文件的依赖关系来排序。

                'auto' 默认值，插件的内置的排序方式，具体顺序....

                'none' 无序？

                {function} 提供一个函数？
            * */
            excludeChunks: ['devor.js'],//排除掉一些js
            xhtml: false,  //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。
            cache: true,  //默认是true的，表示内容变化的时候生成一个新的文件。
        })
    ]
};
