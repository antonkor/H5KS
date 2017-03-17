/*******************************
            Set-up
*******************************/

var gulp         = require('gulp');


var serve        = require('./tasks/serve'),
		buildHTML    = require('./tasks/build/html'),
		buildCSS     = require('./tasks/build/css');
		buildJS      = require('./tasks/build/javascript'),
		buildIcons   = require('./tasks/build/icons'),
		buildImages  = require('./tasks/build/images');


// Default Task
gulp.task('default', ['serve']);
