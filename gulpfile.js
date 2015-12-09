var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var spawn = require('child_process').spawn;
var node;

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'docs_src': './docs/**/*.*',
	'docs_dest': './public/md/',
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}

};

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});


//gulp.task('runKeystone', shell.task('node keystone.js'));

////// Run Server Task ///////
gulp.task('server', function() {
	if (node) node.kill();
	// Move the documentation into the page at runtime
	//gulp.src(paths.docs_src).pipe(gulp.dest(paths.docs_dest));
	node = spawn('node', ['keystone.js'], {stdio: 'inherit'});		//command, file, options
});


////// Watch Tasks //////
gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('watch:server', ['server'], function () {
	gulp.watch('./routes/**/*.js', ['server']);
	gulp.watch('./keystone.js', ['server']);
});


gulp.task('watch', ['watch:server', 'watch:sass','watch:lint']);

gulp.task('default', ['watch', 'server']);
