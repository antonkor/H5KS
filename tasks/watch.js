/*******************************
        Watch and reload
*******************************/

var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create();
    //gulpif        = require('gulp-if')


// Watch all files and reload browswer
gulp.task('browser-sync', ['build-html'], function() {

	browserSync.init({
		proxy: "localhost/h5ks/dist",
		// notify: false,
		open: false,
		ui: false
	});


  gulp.watch(['./src/**/*.pug'], ['buld-html']);
	gulp.watch('./dist/**/*.html').on('change', browserSync.reload);

  gulp.watch(['./src/sass/**/*.+(sass|scss)'], ['build-css']);
	gulp.watch('./dist/assets/css/**/*.css').on('change', browserSync.reload);

	gulp.watch('dist/assets/js/**/*.js').on('change', browserSync.reload);

});
