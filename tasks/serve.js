/*******************************
        Watch and reload
*******************************/

var gulp          = require('gulp'),
    browserSync   = require('browser-sync').create();
    //gulpif      = require('gulp-if')



// Watch all files and reload browswer
gulp.task('serve', ['build-html', 'build-css'], function() {

	browserSync.init({
    server: "./dist",
		//proxy: "localhost/revcontent/dist",
		// notify: false,
		open: false,
		ui: false
	});




  gulp.watch(['src/**/*.pug'], ['build-html']);
  gulp.watch('dist/**/*.html').on('change', browserSync.reload);

  gulp.watch(['src/sass/**/*.+(sass|scss)'], ['build-css']);
  gulp.watch('dist/assets/css/**/*.css').on('change', browserSync.reload);

  gulp.watch('dist/assets/js/**/*.js').on('change', browserSync.reload);

  gulp.watch(['src/icons/*.svg'], ['build-icons']);
  gulp.watch(['./dist/assets/css/icons-sprite.css'], ['build-css']);

  gulp.watch(['src/images/**/*'], ['build-images']);
  //gulp.watch(['./dist/assets/img/**/*'], ['build-css']);

});
