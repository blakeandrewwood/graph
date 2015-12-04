var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	target: 'web',
	entry: "./src/Graph.js",
	output: {
		path: __dirname + '/build',
		filename: "Graph.js",
		libraryTarget: 'umd',
		library: 'Graph'
	},
	plugins : [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['demo', 'build'] }
		})
	]
}