/*******************************
        Build Images Task
*******************************/

var gulp      = require('gulp'),
    newer     = require('gulp-newer'),
    imagemin = require('gulp-imagemin');


gulp.task('build-images', function() {
  return gulp.src('src/images/**/*')
    .pipe(newer('dist/assets/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img'));
});
