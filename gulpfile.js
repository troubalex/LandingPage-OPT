var gulp = require('gulp');
var webserver = require('gulp-webserver');
// var sass = require('gulp-sass')
var sass = require('gulp-ruby-sass');


gulp.task('default', ['webserver', 'sass','watch']);

gulp.task('webserver', function() {
	gulp.src('app')
	.pipe(webserver({
		fallback: 'index.html'
	}));

});


gulp.task('sass', function () {
	return gulp.src('./app/scss/*.scss')
	.pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
	.on('error', function (err) { console.log(err.message); })
	.pipe(gulp.dest('./app/style'));
});

gulp.task('html', function () {
	gulp.src('./app/*.html');
});


gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']);
	gulp.watch(['./app/scss/*.scss'], ['sass']);

});