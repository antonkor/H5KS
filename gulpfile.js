/*******************************
            Set-up
*******************************/

var gulp         = require('gulp');


var serve        = require('./tasks/serve'),
	  buildHTML    = require('./tasks/build/html'),
		buildCSS     = require('./tasks/build/css');
	  buildJS      = require('./tasks/build/javascript'),
	  //buildIcons  = require('./tasks/build/icons');



// Default Task
gulp.task('default', ['browser-sync']);
