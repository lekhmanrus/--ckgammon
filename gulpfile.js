var gulp     = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    plugins  = require('gulp-load-plugins')();

plugins.del   = require('del');
plugins.bower = require('bower');
plugins.bowerFiles = require('main-bower-files');

var src  = './assets/',
    dist = './out/';

gulp

.task('bower', function(done) {
  return plugins
  .bower.commands.install()
  .on('log', function(data) {
    plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
  });
})

.task('sass', function(done) {
  var self = this;
  var errorHandler = function(err) {
    plugins.util.log(plugins.util.colors.red("Error."), err.toString());
    self.emit('end');
  };
  gulp
  .src(src + 'stylesheets/*.scss')
  .pipe(plugins.sass().on('error', errorHandler))
  .pipe(plugins.autoprefixer())
  .pipe(plugins.minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(plugins.rename({ suffix: '.min' }))
  .pipe(gulp.dest(dist + 'css'))
  .on('error', errorHandler)
  .on('end', done);
})

.task('js', function(done) {
  var self = this;
  var errorHandler = function(err) {
    plugins.util.log(plugins.util.colors.red("Error."), err.toString());
    self.emit('end');
  };
  gulp
  .src(src + 'js/**/*.js')
  .pipe(plugins.uglify().on('error', errorHandler))
  .pipe(plugins.rename({ suffix: '.min' }))
  .pipe(gulp.dest(dist + 'js/'))
  .on('error', errorHandler)
  .on('end', done);
})

.task('copy', function() {
  gulp
  .src(src + 'favicon.ico')
  .pipe(gulp.dest(dist));
  gulp
  .src(src + 'fonts/**/**')
  .pipe(gulp.dest(dist + 'fonts/'));
  gulp
  .src(src + 'images/**/**')
  .pipe(gulp.dest(dist + 'images/'));
  gulp
  .src(src + 'partials/**/**')
  .pipe(gulp.dest(dist + 'partials/'));
  gulp
  .src('./bower_components/**/**')
  .pipe(gulp.dest(dist + 'bower_components/'));
})

.task('inject', [ 'js', 'sass', 'copy' ], function(done) {
  var srcOpt = {
    read: false,
    cwd : dist
  };
  var injOpt = {
    addRootSlash: false,
    addPrefix: '.'
  };
  var bowerInjOpt = {
    name: 'bower',
    transform: function(filepath) {
      if(filepath.slice(-4) === '.css') {
        return '<link rel="stylesheet" href="' + filepath.slice(2) + '">';
      }
      else if(filepath.slice(-3) === '.js') {
        return '<script src="' + filepath.slice(2) + '"></script>';
      }
      return plugins.inject.transform.apply(plugins.inject.transform, arguments);
    }
  };
  var stylesSrc  = gulp.src('css/**/*.css', srcOpt),
      scriptsSrc = gulp.src('js/**/*.js', srcOpt),
      bowerSrc   = gulp.src(plugins.bowerFiles(), srcOpt);
  gulp
  .src(src + 'index.html')
  .pipe(plugins.inject(bowerSrc, bowerInjOpt))
  .pipe(plugins.inject(scriptsSrc, injOpt))
  .pipe(plugins.inject(stylesSrc, injOpt))
  .pipe(gulp.dest(dist))
  .on('end', done);
})

.task('clean', function(done) {
  return plugins.del([ dist ], function(err, deletedFiles) {
    if(deletedFiles) {
      plugins.util.log('Files deleted:', deletedFiles.join(', '));
    }
    done();
  });
})

.task('connect', function() {
  plugins.connect.server({
    root: dist,
    livereload: true
  });
})

.task('open', function() {
  gulp
  .src(dist + 'index.html')
  .pipe(plugins.open('', { url: 'http://localhost:8080' }));
})

.task('livereload', function() {
  return gulp
  .src(dist)
  .pipe(plugins.connect.reload());
})

.task('watch', function() {
  gulp.watch([ src + '**/**', './bower.json' ], [ 'make' ]);
})

.task('make', gulpsync.sync([ 'clean', 'bower', 'inject', 'livereload' ]))

.task('default', gulpsync.sync([ 'make', 'connect', 'open', 'watch' ]));
