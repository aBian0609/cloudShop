const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')
const loadpath = require('./plugin/loadpath')

const srcdir = path.resolve(__dirname, 'src')
const putdir = path.resolve(__dirname, 'dist')

module.exports = {
	// entry: (new loadpath).init({
	// 	src:path.resolve(srcdir, 'miniprogram/app.js')
	// }),
	entry: {
		'app':path.resolve(srcdir, 'miniprogram/app.js'),
		'pages/cart/cart':path.resolve(srcdir, 'miniprogram/pages/cart/cart.js'),
		'pages/detail/detail':path.resolve(srcdir, 'miniprogram/pages/detail/detail.js'),
		'pages/index/index':path.resolve(srcdir, 'miniprogram/pages/index/index.js'),
		'pages/order/order':path.resolve(srcdir, 'miniprogram/pages/order/order.js'),
		'pages/submit/submit':path.resolve(srcdir, 'miniprogram/pages/submit/submit.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(putdir, 'miniprogram')
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader'
		}]
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
		new CopyPlugin({
			patterns: [{
				from: path.resolve(srcdir, 'cloudfunctions'),
				to: path.resolve(putdir, 'cloudfunctions')
			}, {
				from: path.resolve(srcdir, 'miniprogram'),
				to: path.resolve(putdir, 'miniprogram'),
				globOptions: {
					ignore: ['**/*.js'],
				}
			}]
		})
	]
};