const webpack = require('webpack');
const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const uglifyjs = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const bootstrapConfig = require('./webpack.bootstrap.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports ={
	mode: 'production',
	entry:{
		main:'./src/main-pro.js',
		index:'./src/js/index.js',
		Jquery:'./src/js/jquery.min.js',
		public:'./src/js/public-pro.js',
		bootstrap:bootstrapConfig.prod,
		headPage:'./src/js/headerPage.js',
		swiper:'./src/js/swiper-3.3.1.min.js'
	},
	output:{
		path:path.resolve(__dirname,"dist"),
		publicPath: '/',
		filename:'./ProDemo/dist/js/[name].js'
	},
	module:{
		rules:[
			{
				test: /\.(png|jpg|jqep|gif|svg|icon)$/,
				loader: 'url-loader?limit=8192&name=./ProDemo/dist/static/[hash:8].[name].[ext]'
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
        		use: 'url-loader?limit=10000&name=./ProDemo/dist/font/[hash:8].[name].[ext]',
      		},
      		{
        		test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        		use: 'file-loader?name=./ProDemo/dist/font/[hash:8].[name].[ext]',
      		}
		]  
	},
	plugins:[
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery"
	    }),
	    // new ExtractTextPlugin('./css/[name].css'),
		new HtmlWebpackPlugin({
	    	template: './index.html', //指定要打包的html路径和文件名
	    	filename:'./ProDemo/dist/index.html', //指定输出路径和文件名
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
	    	filename:'./ProDemo/dist/pages/headerPage.html', //指定输出路径和文件名
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