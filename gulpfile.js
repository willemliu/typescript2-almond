var gulp = require('gulp');
var plumber = require('gulp-plumber');
gulp.plumbedSrc = function( ){
    return gulp.src.apply( gulp, arguments )
        .pipe( plumber() );
};
var gulpsync = require('gulp-sync')(gulp);
var del = require('del');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var rjs = require('requirejs');

gulp.task('default', gulpsync.sync(['clean', 'copy-build', 'rjs']));
gulp.task('watch', ['default'], function() {
    gulp.watch(['./*.html', './img/**/*', './*.ico', './js/**/*'], ['copy-build']);
    gulp.watch(['./src/**/*'], ['rjs']);
});

/**
 * Clear the dist folder
 */
gulp.task('clean', function() {
    return del.sync([
        'build/**',
        'dist/**'
    ], {force: true});
});

gulp.task('copy-build', ['copy-html-build', 'copy-js-build']);
gulp.task('copy-html-build', function() {
    return gulp.plumbedSrc([
        './*.ico',
        './*.html'
    ]).pipe(gulp.dest('./dist'));
});
gulp.task('copy-js-build', function() {
    return gulp.plumbedSrc([
      './js/**/*',
      './node_modules/intersection-observer/intersection-observer.js'
    ]).pipe(gulp.dest('./build/js'));
});

gulp.task("ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build/js"));
});

/**
 * RequireJS compilation.
 */
gulp.task('rjs', ['ts'], function(cb){
  rjs.optimize({
    baseUrl: 'build/js',
    generateSourceMaps: true,
    include: ['main'],
    insertRequire: ["main"],
    name: 'lib/almond',
    optimize: "uglify2",
    out: 'dist/js/main.js',
    preserveLicenseComments: false,
    removeCombined: true,
    sourceMapIncludeSources: true,
    /*uglify2: {
        //Example of a specialized config. If you are fine
        //with the default options, no need to specify
        //any of these properties.
        output: {
            beautify: true
        },
        compress: {
            sequences: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: false
    },*/
    wrap: true
  }, function(buildResponse){
    // console.log('build response', buildResponse);
    cb();
  }, cb);
});