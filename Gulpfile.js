var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
// var Cache = require('gulp-file-cache');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var webpackDevPort = 3003;
// var cache = new Cache();

gulp.task('less', function () {
  return gulp.src('./public/**/*.less')
	.pipe(less())
	.pipe(concat('app.css'))
	.pipe(gulp.dest('./public/css'));
});

gulp.task('less-watch', [ 'less' ], function() {
	gulp.watch('public/**/*.less', [ 'less' ]);
});

gulp.task('webpack', function(callback) {
	webpack(config, function() {
		callback();
	});
});

gulp.task('webpack-watch', [ 'webpack' ], function() {
	gulp.watch('public/**/*.jsx', [ 'webpack' ]);
});

gulp.task('node', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		ignore: ['public/**/*', 'node_modules/**/*', 'bower_components/**/*']
	});
});

gulp.task('serve', [ 'node', 'webpack-watch', 'less-watch' ], function () {
	// new WebpackDevServer(webpack(config), {
	// 	publicPath: config.output.publicPath,
	// 	hot: true,
	// 	contentBase: 'public'
	// 	// historyApiFallback: true
	// }).listen(webpackDevPort, 'localhost', function (err, result) {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log('Listening at http://localhost:' + webpackDevPort);
	// });
});
