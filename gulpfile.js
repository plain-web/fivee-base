// plugin
var gulp = require('gulp');
var plumber = require('gulp-plumber'); //error gulp
var scss = require('gulp-sass'); //scss
var scssMin = require('gulp-sass'); //scss minifi
var haml = require('gulp-ruby-haml'); // haml
var autoprefixer = require('gulp-autoprefixer'); //vendor prefix
var browserSync = require('browser-sync'); //browser reloat
var changed  = require('gulp-changed'); // change path
var uglify = require('gulp-uglify'); //minifi 
var rename = require("gulp-rename"); //rename minifi files
var replace = require('gulp-replace'); //minify scss comment
//var spritesmith = require('gulp.spritesmith'); //photo sprite

/*========================================================================
  path
======================================================================== */ 
var path = {
  base: './htdocs',
  watchJs: ['./src/js/*.js', '!./htdocs/js/*.min.js'],
  htdocsJs: './htdocs/js',
  srcJs : './src/js/**',
  srcScss: './src/scss/**/*scss',
  srcCss: './htdocs/css',
  srcImg: './src/img/**',
  htdocsImg: './htdocs/img',
  srcHaml: './src/**/*.haml',
  htdocsHtml: './htdocs'
  //sprite :'./img/sprite/*.png',
  //spriteImg :'./img/',
  //spriteScss :'./scss/'
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
  haml
======================================================================== */
gulp.task('haml', function() {
  var options = {
    doubleQuote: true
  };
  gulp.src(path.srcHaml)
    .pipe(changed(path.htdocsHtml, { extension: '.html' }))
    .pipe(plumber())
    .pipe(haml(options))
    .pipe(gulp.dest(path.htdocsHtml))
    .pipe(browserSync.reload({stream:true}));
});
/*========================================================================
  js
======================================================================== */
gulp.task('js', function() {
  gulp.src(path.watchJs)
    .pipe(plumber())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.htdocsJs))
    .pipe(browserSync.reload({stream:true}));
});
/*========================================================================
  scss
======================================================================== */
gulp.task('scss', function() {
  gulp.src(path.srcScss)
    //.pipe(changed(path.srcCss, { extension: '.css' }))
    .pipe(plumber())
    .pipe(scss({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(path.srcCss));
});
//minifi css
gulp.task('scssMin', function() {
  gulp.src(path.srcScss)
    .pipe(plumber())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(replace('/*!', '/*'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.srcCss))
    .pipe(browserSync.reload({stream:true}));
});
// /*========================================================================
//   theme-default
// ======================================================================== */
// var themeDefault = require('gulp-scss');
// gulp.task('themeDefault', function() {
//   gulp.src('./scss/theme-default/*.scss')
//     .pipe(plumber())
//     .pipe(scss({outputStyle: 'expanded'}))
    // .pipe(autoprefixer({
    //   browsers: ['last 3 versions'],
    //   cascade: false
    // }))
//     .pipe(gulp.dest('./css/theme-default/'))
//     .pipe(browserSync.reload({stream:true}));
// });
/*========================================================================
  default (watch)
======================================================================== */
gulp.task('default', ['server'], function() {
  gulp.watch(path.srcHaml,['haml']);
  gulp.watch(path.watchJs,['js']);
  gulp.watch(path.srcScss,['scss','scssMin']);
  //gulp.watch('./scss/_*.scss',['themeDefault']);
});
/*========================================================================
  build task
======================================================================== */
gulp.task('copy', function(){
  //copy js and img
  gulp.src(path.srcJs)
    .pipe(gulp.dest(path.htdocsJs));
  gulp.src(path.srcImg)
    .pipe(gulp.dest(path.htdocsImg));
});
/*========================================================================
  build task
======================================================================== */
gulp.task('build', ['haml','js','scss','scssMin','copy']);