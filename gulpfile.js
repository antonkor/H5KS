/*******************************
            Set-up
*******************************/

var gulp          = require('gulp'),
		path          = require('path');
		//gulpif        = require('gulp-if'),


var paths = {
		//pug:        path.join('src','**/*.pug,'),
	  css:        path.join('assets', 'css'),
	  sass:       path.join('assets', 'sass', '+(main|page-home|bootstrap).+(scss|sass)'),
	  allSass:    path.join('assets', 'sass', '**/*.+(scss|sass)'),
	  //icons_src:  path.join('assets', 'icons', '*.svg'),
	  //icons_dest: path.join('assets', 'fonts'),
}

var watch        = require('./tasks/watch'),
	  buildHTML    = require('./tasks/build/html'),
	  buildJS      = require('./tasks/build/javascript'),
	  buildCSS     = require('./tasks/build/css');
	  //buildAssets  = require('./tasks/build/assets');



// Default Task
gulp.task('default', ['browser-sync']);
