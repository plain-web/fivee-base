// plugin
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var haml = require('gulp-ruby-haml');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var changed  = require('gulp-changed');
//var spritesmith = require('gulp.spritesmith');

/*========================================================================
  path
======================================================================== */ 
var path = {
  base: './',
  js: './js/*.js',
  sass: './sass/**/*scss',
  css: './css',
  haml: './*.haml',
  html: './'
  //sprite :'./img/sprite/*.png',
  //spriteImg :'./img/',
  //spriteScss :'./sass/'
};
/*========================================================================
  browser-sync
======================================================================== */ 
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: path.base
    }
  });
});
/*========================================================================
  css sprite
======================================================================== */
// gulp.task('sprite', function () {
//   var spriteData = gulp.src(path.sprite)
//     .pipe(plumber())
//     .pipe(spritesmith({
//       imgName: 'sprite.png',
//       cssName: '_sprite.scss',
//       cssFormat: 'scss'
//     })
//   );
//   spriteData.img
//     .pipe(gulp.dest(path.spriteImg));
 
//   spriteData.css
//     .pipe(gulp.dest(path.spriteScss));
// });
/*========================================================================
  sass
======================================================================== */
gulp.task('sass', function() {
  gulp.src(path.sass)
    //.pipe(changed(path.css, { extension: '.css' }))
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({stream:true}));
});

/*========================================================================
  haml
======================================================================== */
gulp.task('haml', function() {
  var options = {
    doubleQuote: true
  };
  gulp.src(path.haml)
    .pipe(changed(path.html, { extension: '.html' }))
    .pipe(plumber())
    .pipe(haml(options))
    .pipe(gulp.dest(path.html))
    .pipe(browserSync.reload({stream:true}));
});
/*========================================================================
  default (watch)
======================================================================== */
gulp.task('default', ['server'], function() {
  gulp.watch('./*.haml',['haml']);
  gulp.watch(['js/**/*.js','!js/min/**/*.js'],['js']);
  gulp.watch('./sass/**/*.scss',['sass']);
});