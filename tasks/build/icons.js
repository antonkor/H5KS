/*******************************
        Build Icons Task
*******************************/

var gulp      = require('gulp'),
    svgSprite = require('gulp-svg-sprites'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css');;


gulp.task('build-svg-sprite', function () {
  return gulp.src('src/icons/svg-sprite/*.svg')
    .pipe(svgSprite({
      mode: "sprite",
      cssFile:    'assets/css/icons-sprite.css',
      svg: {
        sprite: 'assets/icons/icons-sprite.svg',
        defs: 'assets/icons/icons-def.svg',
        symbols: 'assets/icons/icons-symbols.svg'
      },
      svgPath: '../../%f',

      padding: '10',
      preview: {
        sprite: 'icons-sprite.html'
      }
    }))
    .pipe(gulp.dest("dist"));
});



var fontName = 'iconfont';

gulp.task('build-iconfont', function(){
  gulp.src(['src/icons/icon-font/*.svg'], {base: 'src/'})
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'src/sass/plugins/_iconfont-template.scss',
      targetPath: '../../../../src/sass/plugins/_iconfont.scss',
      fontPath: '../icons/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      appendCodepoints: true,
      appendUnicode: false,
      normalize: true,
      fontHeight: 1000,
      centerHorizontally: true
     }))
    .pipe(gulp.dest('dist/assets/icons/'));
});
