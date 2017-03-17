/*******************************
        Build Icons Task
*******************************/

var gulp      = require('gulp'),
    svgSprite = require("gulp-svg-sprites");


gulp.task('build-icons', function () {
  return gulp.src('src/icons/*.svg')
    .pipe(svgSprite({
      //mode: "sprite",
      cssFile:    'assets/css/icons-sprite.css',
      svg: {
        sprite: 'assets/svg/icons-sprite.svg',
        defs: 'assets/svg/icons-def.svg',
        symbols: 'assets/svg/icons-symbols.svg'
      },
      svgPath: '../../%f',

      //templates: { scss: true }
      preview: {
        sprite: 'icons-sprite.html'
      }
    }))
    .pipe(gulp.dest("dist"));
});
