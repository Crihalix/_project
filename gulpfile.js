 // needed imports
 var gulp = require('gulp'),
     sass = require('gulp-sass'),
     watch = require('gulp-watch'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
     imagemin = require('gulp-imagemin'),
     sourcemaps = require('gulp-sourcemaps'),
     del = require('del'),
     iconfont = require('gulp-iconfont');

 var paths = {
     scripts: 'src/js/*.js',
     images: 'src/images/*',
     sass: 'src/sass/**/*.scss',
     icoSrc: 'fonts/icons/*.svg',
     fonts: 'fonts/',
     fontsIncl: '../fonts/'
 };

 gulp.task('clean', function () {
     //  return del(['dist']);
 });

 gulp.task('sass', function () {
     return gulp.src(paths.sass)
         .pipe(sourcemaps.init())
         .pipe(sass({
             outputStyle: 'compressed'
         }).on('error', sass.logError))
         .pipe(concat('style.css'))
         .pipe(sourcemaps.write('./maps'))
         .pipe(gulp.dest('dist/css'));
 });

 gulp.task('scripts', function () {
     return gulp.src(paths.scripts)
         .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(concat('scripts.min.js'))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest('dist/js'));
 });

 gulp.task('images', function () {
     return gulp.src(paths.images)
         .pipe(imagemin({
             optimizationLevel: 5
         }))
         .pipe(gulp.dest('dist/images'));
 });


 gulp.task('sass:watch', function () {
     gulp.watch(paths.sass, ['sass']);
 });

 gulp.task('scripts_', function () {
     gulp.watch(paths.scripts, ['scripts']);
 });

 gulp.task('watch', function () {
     gulp.watch(paths.scripts, ['scripts']);
     gulp.watch(paths.images, ['images']);
     gulp.watch(paths.sass, ['sass']);
 });

 gulp.task('default', ['sass', 'scripts', 'images', 'watch']);


// @todo: build iconfonts with gulp

 /*
  gulp.task('iconfont', function() {
      sassPath.forEach(function(p) {
        
  if (p.settings) {
            gulp.src(p.icoSrc)
                .pipe(iconfont({
                      fontName          : 'ca-icons', // required
                      normalize         : true,
                      formats			: ['svg', 'ttf', 'eot', 'woff'],
                      prependUnicode	: true,
                      appendCodepoints  : true // recommended option
                }))
                .on('codepoints', function(codepoints, options) {
                gulp.src(p.settings + '/_icons.tpl')
                    .pipe(
                          consolidate('lodash', {
                          fontName   : options.fontName,
                          glyphs     : codepoints
                          }))
                          .pipe(rename('_icons.scss'))
                          .pipe(gulp.dest(p.settings));
                      gulp.src(p.settings + '/_fonts.tpl')
                        .pipe(
                              consolidate('lodash', {
                                  fontPath  : p.fontsIncl,
                                  fontName  : options.fontName,
                              }))
                          .pipe(rename('_fonts.scss'))
                          .pipe(gulp.dest(p.settings));
                })
                .pipe(gulp.dest(p.fonts));
          }
      });
  });
  */