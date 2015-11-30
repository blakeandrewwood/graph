var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	target: 'web',
	entry: "./src/index.js",
	output: {
		path: __dirname + '/build',
		filename: "client.js"
	},
	plugins : [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['public', 'build'] }
		})
	]
}