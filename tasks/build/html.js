/*******************************
         Build HTML Task
*******************************/

var
  gulp = require('gulp'),
  pug  = require('gulp-pug');


//Compile Pug
gulp.task('build-html', function(done) {
  gulp.src('./src/views/**/!(_)*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
    .on('end', done);
});
