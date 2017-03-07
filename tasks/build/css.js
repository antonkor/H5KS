/*******************************
          Build CSS Task
*******************************/

var
  gulp          = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer'),
  iconfont      = require('gulp-iconfont'),
  iconfontCss   = require('gulp-iconfont-css'),
  sourcemaps    = require('gulp-sourcemaps'),
  sass          = require('gulp-sass'),
  sassGlob      = require('gulp-sass-glob');



// Compile SASS to CSS
gulp.task('css', function () {
	return gulp.src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(debug({title: 'Sass:'}))
		.pipe(plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'})}))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(sass( {outputStyle: 'expanded'} ))
		.pipe(autoprefixer({
      browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
      ]}))
		.pipe(sourcemaps.write('./'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.stream({match: '**/*.css'}));
});
