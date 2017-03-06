///// Plugin Includes /////
var gulp = require('gulp'),
		//gulpif = require('gulp-if'),
		autoprefixer = require('gulp-autoprefixer'),
    //iconfont = require('gulp-iconfont'),
    //iconfontCss = require('gulp-iconfont-css'),
		browserSync = require('browser-sync').create(),
		reload = browserSync.reload,
		path = require('path'),
		plumber = require('gulp-plumber'),
		notify = require('gulp-notify'),
		runSequence = require('run-sequence'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		sassGlob = require('gulp-sass-glob');
		pug = require('gulp-pug'),
		debug = require('gulp-debug');
    //jshint = require('gulp-jshint'),
		//uglify = require('gulp-uglify'),
		//concat = require('gulp-concat'),

var paths = {
	pug:        path.join('_pug','**/*.pug'),
  css:        path.join('assets', 'css'),
  sass:       path.join('assets', 'sass', '+(main|page-home|bootstrap).+(scss|sass)'),
  allSass:    path.join('assets', 'sass', '**/*.+(scss|sass)'),
  //icons_src:  path.join('assets', 'icons', '*.svg'),
  //icons_dest: path.join('assets', 'fonts'),
}



/*
var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'font-icons';

gulp.task('iconfont', function(){
  gulp.src(paths.icons_src)
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'assets/sass/icons/_template.scss',
      targetPath: '../sass/icons/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      //prependUnicode: false, // recommended option: true
      formats: ['ttf', 'eot', 'woff'],
      //timestamp: runTimestamp, // recommended to get consistent builds when watching files
     }))
    .pipe(gulp.dest(paths.icons_dest));
});
*/



// Compile/Validate JS
// gulp.task('js', function () {
// 	gulp.src('./js/app.js')
// 	.pipe(plumber())
// 	.pipe(jshint())
// 	.pipe(jshint.reporter('default', { verbose: true }))
// 	.pipe(concat('app.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('./js/dist/'))
// });





// Compile Sass
gulp.task('sass', function () {
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



// Compile Jade/Pug
// gulp.task('pug', function(done) {
//   gulp.src(paths.pug)
//     .pipe(pug())
//     .pipe(gulp.dest('./'))
//     .on('end', done);
// });

gulp.task('pug', function() {
  return gulp.src(paths.pug)
    .pipe(pug())
    .pipe(gulp.dest('./'));
});


// Browser Sync
gulp.task('browser-sync', ['pug'], function() {

	browserSync.init({
		proxy: "localhost/ifit",
		// notify: false,
		open: true,
		ui: false
	});

	//gulp.watch('assets/css/**/*.css').on('change', browserSync.reload);

	gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);

	gulp.watch(paths.allSass, ['sass']);
	gulp.watch(paths.pug, ['pug']);
	gulp.watch('**/*.html').on('change', reload);

});



// Default Task
gulp.task('default', ['browser-sync']);

//gulp.task('default', ['pug']);
