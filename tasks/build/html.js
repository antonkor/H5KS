/*******************************
          Build Task
*******************************/

var
  gulp         = require('gulp'),
  pug          = require('gulp-pug');


//Compile Pug
gulp.task('html', function(done) {
  gulp.src(['./src/**/*.pug', '!./src/templates/**/*.pug'])
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
    .on('end', done);
});
