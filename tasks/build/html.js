/*******************************
         Build HTML Task
*******************************/

var
  gulp       = require('gulp'),
  fs         = require('fs'),
  pug        = require('gulp-pug');


//Compile Pug
gulp.task('html', function(done) {
  gulp.src('./src/views/**/!(_)*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
    .on('end', done);
});
