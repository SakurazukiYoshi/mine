
# 这是一个对于`vue.config.js`文件的研究


## 运行环境

通常分辨开发环境还是正式环境的判断是

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }

    //process.env - 属性返回包含用户环境的对象,但是NODE_ENV并不在对象上。

	//process.env.NODE_ENV === 'development'; // 或简写 dev，意为开发环境
	/process.env.NODE_ENV === 'production'; // 或简写 prod，意为生产环境


实际上：
	
	{
	  "scripts": {
	    "dev": "set NODE_ENV=development&&node  test.js"
	  }
	}

是在运行命令行的时候设置的,此时只与单属性有关，但是貌似和兼容性有关系，window和linux上的系统可能会出问题

最优解：

	npm install --save-dev cross-env
	{
	  "scripts": {
	    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
	  }
	}

这样既可


## HtmlWebpackPlugin组件的使用







##指定特殊符号为固定路径


    resolve: {
        alias: {
            '@': 'D:\\project\\mine\\src',
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
	}


这里在项目中@代表src下的路径


vue-cli中的用法：



	const path=require('path');
	const resolve = dir => path.join(__dirname, dir);
	module.exports = {
	    lintOnSave: true,
	    chainWebpack: config => {
	            config.resolve.alias
	                .set('_c', resolve('src/components')).
            		.set('_c', '@/components')
	        }
	    }
	}




## iview的css样式外链引入无效

  <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet external nofollow" >


这里需要注意的是`rel`这里的值一定要对应好，否者就会无效


	rel='nofollow'属性
	搜索引擎这个链接不是经过作者自己编辑的，所以这个链接不是一个信任票

	rel=’external’
	其 实rel=’external’只是一个替代target=”_blank” 的属性。target=”_blank” 的属性是打开新窗口。
	
	external就是指外部站点，我们要在新窗口中打开链接传统的通常做法是在链接后面加target="_blank"，我们采用过渡型的 DOCTYPE(xhtml1- transitional. dtd) 时没有问题，但是当我们使用严格的DOCTYPE(xhtml1-strict.dtd)时，这个方法将通不过 W3C的校验。

