/*******************************
            Set-up
*******************************/

var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload,
    debug         = require('gulp-debug'),
		path          = require('path'),
		//plumber       = require('gulp-plumber'),
		runSequence   = require('run-sequence');
    //gulpif        = require('gulp-if')


// Watch all files and reload browswer
gulp.task('browser-sync', ['html'], function() {

	browserSync.init({
		proxy: "localhost/h5ks/dist",
		// notify: false,
		open: false,
		ui: false
	});


  gulp.watch(['./src/**/*.pug'], ['html']);
	gulp.watch('**/*.html').on('change', reload);

  //gulp.watch(paths.allSass, ['css']);
	//gulp.watch('assets/css/**/*.css').on('change', browserSync.reload);

	gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);

});
