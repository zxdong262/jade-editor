
var gulp = require('gulp')
,path = require('path')
,util = require('util')
,gutil = require('gulp-util')
,changed = require('gulp-changed')
,pkg = require('./package.json')
,fs = require('fs')
,rename = require('gulp-rename')
,plumber = require('gulp-plumber')
,watch = require('gulp-watch')
,stylus = require('gulp-stylus')
,stylusOptions = {
	compress: true
}

// CONFIG
//

var src = {
	cwd: 'src'
	,dist: 'dist'
}

var banner = gutil.template('/**\n' +
	' * <%= pkg.name %>\n' +
	' * @version v<%= pkg.version %> - <%= today %>\n' +
	' * @link <%= pkg.homepage %>\n' +
	' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
	' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
	' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)})


// CLEAN
//
var clean = require('gulp-clean')
gulp.task('clean:test', function() {
	return gulp.src(['test/.tmp/*', 'test/coverage/*'], {read: false})
		.pipe(clean())
})
gulp.task('clean:dist', function() {
	return gulp.src([src.dist + '/*'], {read: false})
		.pipe(clean())
})

gulp.task('stylus', function () {
	gulp.src('./src/jade-editor.styl')
		.pipe(stylus(stylusOptions))
		.pipe(gulp.dest('./dist/'))
})

// SCRIPTS
//
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var concat = require('gulp-concat-util')
var sourcemaps = require('gulp-sourcemaps')
gulp.task('scripts:dist', function() {

	// Build unified package
	gulp.src(['./src/' + pkg.name + '.js'])

		.pipe(concat.header(';(function(window, document, undefined) {\n\n'))
		.pipe(concat.footer('\n\n})(window, document);\n'))
		.pipe(concat.header(banner))
		.pipe(gulp.dest(src.dist))
		.pipe(rename(function(path) { path.extname = '.min.js'; }))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat.header(banner))
		.pipe(gulp.dest(src.dist))

	gulp.src(['./src/vender/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest(src.dist + '/vender'))

	runSequence('stylus')


})

// TEST
//

var karma = require('karma').server

gulp.task('karma:unit', function() {
	karma.start({
		configFile: path.join(__dirname, 'test/karma.conf.js'),
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		singleRun: true
	}, function(code) {
		gutil.log('Karma has exited with ' + code)
		process.exit(code)
	})
})


// DEFAULT
//
var runSequence = require('run-sequence')
gulp.task('default', ['dist'])
gulp.task('build', ['dist'])
gulp.task('test', function() {
	runSequence('clean:test', 'karma:unit')
})

gulp.task('dist', function() {
	runSequence('clean:dist', 'scripts:dist')
})


gulp.task('watch',  function () {

	watch('./src/' + pkg.name + '.js', function() {
		runSequence('dist')
	})

	watch('./src/*.styl', function() {
		runSequence('stylus')
	})

})