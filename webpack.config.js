var webpack = require('webpack');
var path = require('path');

var PUBLIC_PATH = path.resolve(__dirname, 'public')
var APP_DIR = path.join(PUBLIC_PATH, 'app');

var config = {
	entry: [
		APP_DIR + '/app.jsx'
	],
	output: {
		path: PUBLIC_PATH,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?/,
			include: APP_DIR,
			loaders: [ 'babel' ]
		},{
			test: require.resolve('react'),
			loader: 'expose?React'
		}]
	},
	// plugins: [
	// 	new webpack.HotModuleReplacementPlugin(),
	// 	new webpack.ProvidePlugin({
	// 		$: "jquery",
	// 		jQuery: "jquery",
	// 		"window.jQuery": "jquery"
	// 	})
	// ],
	// devServer: {
	// 	proxy: {
	// 		'/auth/*': {
	// 			target: 'http://localhost:8081'
	// 		},
	// 		'/api/*': {
	// 			target: 'http://localhost:8081'
	// 		}
	// 	}
	// }
};

module.exports = config;