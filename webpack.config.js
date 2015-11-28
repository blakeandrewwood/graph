var webpack = require('webpack');
module.exports = {
	target: 'web',
	entry: "./src/index.js",
	output: {
		path: __dirname + '/build',
		filename: "client.js"
	}
}