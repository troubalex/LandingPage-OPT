var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var paths = {
    scss: './app/**/*.scss'
};

gulp.task('default', ['webserver', 'sass','watch']);

gulp.task('webserver', function() {
	gulp.src('app')
	.pipe(webserver({
		proxies: [{source:'/opt',
		target:"https://online-pt-mvp.app.iterate.no/"}]
	}));

});


gulp.task('sass', function () {
  gulp.src('./app/scss/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
   .pipe(gulp.dest('./app/style'));
});


gulp.task('html', function () {
	gulp.src('./app/*.html');
});


gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']);
	gulp.watch(['./app/scss/*.scss', './app/scss/**/*.scss'], ['sass']);

});