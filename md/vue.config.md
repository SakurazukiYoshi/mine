
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

