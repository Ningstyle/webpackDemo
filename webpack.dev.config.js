const webpack = require('webpack');
const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const uglifyjs = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const bootstrapConfig = require('./webpack.bootstrap.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports ={
	mode: 'development',
	// mode: 'production',
	entry:{
		main:'./src/main-dev.js',
		index:'./src/js/index.js',
		Jquery:'./src/js/jquery.min.js',
		public:'./src/js/public-dev.js',
		bootstrap:bootstrapConfig.dev,
		headPage:'./src/js/headerPage.js',
		swiper:'./src/js/swiper-3.3.1.min.js'
	},
	output:{
		path:path.resolve(__dirname,"dist"),
		publicPath: '/',
		filename:'./js/[name].js'
	},
	module:{
		rules:[
			{
				test: /\.(png|jpg|jqep|gif|svg|icon)$/,
				loader: 'url-loader?limit=8192&name=static/[hash:8].[name].[ext]'
　　　　		},
			{
				test: /\.html$/,
				loader: 'html-withimg-loader'
　　　　		},
			{
				test:/\.css$/,
				use:['style-loader','css-loader'],
			},
			{
				test:/\.less$/,
				use:['style-loader','css-loader','less-loader']
			},
			{
        		test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        		use: 'url-loader?limit=10000&name=font/[hash:8].[name].[ext]',
      		},
      		{
        		test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        		use: 'file-loader?name=font/[hash:8].[name].[ext]',
      		}
		]  
	},
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8080',
        open:false,//自动拉起浏览器
        hot:true,//热加载
        // hotOnly:true
        compress:true
    },
	plugins:[
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery"
	    }),
	    // new ExtractTextPlugin('./css/[name].css'),
		new HtmlWebpackPlugin({
	    	template: './index.html', //指定要打包的html路径和文件名
	    	filename:'./index.html', //指定输出路径和文件名
	    	hash:true,
	    	inject: 'head',
	    	minify: {
                minimize: false,
                removeConments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,

            },
            chunks: ['main','Jquery','public','index','bootstrap','swiper']
            // excludeChunks: ['main','index']
	  	}),
	  	new HtmlWebpackPlugin({
	    	template: './src/pages/headerPage.html', //指定要打包的html路径和文件名
	    	filename:'./pages/headerPage.html', //指定输出路径和文件名
	    	hash:true,
	    	inject: 'head',
	    	minify: {
                minimize: false,
                removeConments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,

            },
            chunks: ['main','Jquery','headPage','bootstrap']
            // excludeChunks: ['main','index']
	  	}),
	  	new webpack.HotModuleReplacementPlugin(),
	],
	// watch: true
}