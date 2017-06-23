/*******************************
            Set-up
*******************************/
var gulp = require('gulp'),
    // utilities
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    // html
    pug = require('gulp-pug'),
    // css
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    // js
    modernizr = require('gulp-modernizr'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // img
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    // icons
    svgSprite = require("gulp-svg-sprites"),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css');



// Options
var isProduction = true;
var sassOutput = 'compressed';
var sourceMap = false;
if(gutil.env.dev === true) {
    sassOutput = 'expanded';
   // sourceMap = true; not sure to exclude for production
    isProduction = false;
}



// Paths
var basePaths = {
    src: 'src/',
    dest: 'dist/',
    bower: 'bower_components/'
};
var paths = {
    html: {
        src: basePaths.src,
        dest: basePaths.dest
    },
    styles: {
        src: basePaths.src + 'assets/sass/',
        dest: basePaths.dest + 'assets/css/'
    },
    images: {
        src: basePaths.src + 'assets/images/',
        dest: basePaths.dest + 'assets/images/'
    },
    scripts: {
        src: basePaths.src + 'assets/js/',
        dest: basePaths.dest + 'assets/js/'
    },
};



// Compile Pug into HTML
gulp.task('build-html', function(done) {
  gulp.src(paths.html.src + '/**/!(_)*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .on('end', done);
});



// Compile SASS to CSS
gulp.task('css', function() {
    return gulp.src(paths.styles.src + '**/*.+(sass|scss)')
        .pipe(sourcemaps.init())
        //.pipe(debug({title: 'Sass:'}))
        .pipe(plumber({ errorHandler: notify.onError({ Error: '<%= error.message %>', sound: 'Bottle' }) }))
        .pipe(sassGlob())
        //.pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: sassOutput }))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 10",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ]
        }))
        //.pipe(rename({suffix: ".min",}))
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});



// Optimize images
gulp.task('images', function() {
    return gulp.src(paths.images.src + '**/*')
        .pipe(newer(paths.images.dest))
        .pipe(imagemin([
            //imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({ plugins: [{ removeViewBox: true }] })
        ]))
        .pipe(gulp.dest(paths.images.dest));
});


// // Build SVG sprite
// gulp.task('svg-sprite', function() {
//     return gulp.src('assets/icons/svg-sprite/*.svg')
//         .pipe(svgSprite({
//             //mode: "sprite",
//             cssFile: 'assets/sass/plugins/_icons-sprite.css',
//             svg: {
//                 sprite: 'assets/icons/icons-sprite.svg',
//                 //defs:    'assets/icons/icons-def.svg',
//                 //symbols: 'assets/icons/icons-symbols.svg'
//             },
//             svgPath: '../../%f',

//             templates: { scss: true },
//             preview: false
//         }))
//         .pipe(gulp.dest('./'));
// });

// // Compile Iconfont
// var fontName = 'iconfont';
// gulp.task('iconfont', function() {
//     gulp.src(['assets/icons/iconfont/*.svg'])
//         .pipe(iconfontCss({
//             fontName: fontName,
//             path: 'assets/sass/plugins/_iconfont-template.scss',
//             targetPath: '../../assets/sass/plugins/_iconfont.scss',
//             fontPath: '../../assets/icons/'
//         }))
//         .pipe(iconfont({
//             fontName: fontName,
//             formats: ['ttf', 'eot', 'woff', 'woff2'],
//             appendCodepoints: true,
//             appendUnicode: false,
//             normalize: true,
//             fontHeight: 1000,
//             centerHorizontally: true
//         }))
//         .pipe(gulp.dest('./assets/icons/'));
// });



// Concat and minify JS
var scripts = [
    paths.scripts.src + 'lib/modernizr.js',
    paths.scripts.src + 'lib/velocity.js',
    paths.scripts.src + 'lib/velocity.ui.js',
    paths.scripts.src + 'plugins/headroom.min.js',
    paths.scripts.src + 'plugins/swiper.js',
    paths.scripts.src + 'plugins/enquire.js',
    paths.scripts.src + 'plugins/autogrow.js',
    paths.scripts.src + 'plugins/smooth-scroll.js',
    paths.scripts.src + 'bootstrap/modal.js',
    paths.scripts.src + 'bootstrap/scrollspy.js',
    paths.scripts.src + 'bootstrap/dropdown.js',
    paths.scripts.src + 'bootstrap/collapse.js',
    paths.scripts.src + 'main.js'
];

// Dev JS
gulp.task('js', function() {
    return gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js') )
        .pipe(isProduction ? uglify() : gutil.noop() )
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest));
});

// Production JS (minified)
gulp.task('min-js', function() {
    return gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('main.bundle.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(uglify())
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest));
});








// Browsersync
gulp.task('serve', ['css'], function() {

    // Start localhost server
    browserSync.init({
        server: "./dist", // for www dev
        //proxy: "localhost/ewedding.com/", // for wp dev
        // notify: false,
        open: false,
        ui: false
    });

    // Watch for HTML/ PHP changes
    gulp.watch(paths.html.src + '**/*.pug', ['build-html']);
    gulp.watch(paths.html.dest + '**/*.+(html|php)').on('change', browserSync.reload);

    // Watch for SASS changes
    gulp.watch(paths.styles.src + '**/*.+(sass|scss)', ['css']);
    gulp.watch(paths.styles.dest + 'main.css').on('change', browserSync.reload);

    // Watch for Image changes
    gulp.watch(paths.images.src + '**/*', ['images']);
    gulp.watch(paths.images.dest + '**/*.+(png|jpg|svg)').on('change', browserSync.reload);

    // // Watch for Icon changes
    // gulp.watch('assets/icons/svg-sprite/*.svg', ['svg-sprite']);
    // gulp.watch('assets/icons/iconfont/*.svg', ['iconfont']);

    // // Watch for JS changes
    gulp.watch(paths.scripts.src + '**/*.js', ['js']);
    gulp.watch(paths.scripts.dest + 'main.bundle.js').on('change', browserSync.reload);


});

// Default Task
gulp.task('default', ['serve']);