'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var cssimport = require("gulp-cssimport");
var build = require('gulp-build');

gulp.task('styles', function() {
    gulp.src(['public/stylesheets/custom.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    var appScripts = [
            'public/javascripts/main.js',
            'node_modules/mustache/mustache.min.js'
        ]

    gulp.src(appScripts)
       .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function (){
    gulp.src(['public/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function (){
    gulp.src(['public/images/*'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {

    gulp.src('dist')
      .pipe(webserver({
        livereload: false,
        directoryListing: false,
        open: true,
        port: 7000,
        fallback: 'index.html'
      }));

    gulp.watch('public/index.html', ['html']);
    gulp.watch('public/javascripts/**/*.js', ['scripts']);
    gulp.watch('public/stylesheets/**/*.scss', ['styles']);
    gulp.watch('public/images/**/*', ['images']);
});

gulp.task('serve', ['watch']);