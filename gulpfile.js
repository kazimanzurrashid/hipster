var gulp = require('gulp');

var appDirectory = './src';

var config = {
  indexHtmlFile: appDirectory + '/index.html',
  appJSFiles: appDirectory + '/js/**/*.js',
  specJSFiles: './specs/**/*.js',
  distDirectory: './dist/',
  coverageDirectory: './coverage/',
  serveDirectory: './.serve/'
};

gulp.task('jscs', function() {
  var jscs = require('gulp-jscs');

  return gulp.src(config.appJSFiles
    .concat(config.specJSFiles))
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('jshint', function() {
  var jshint = require('gulp-jshint');

  return gulp.src(config.appJSFiles
    .concat(config.specJSFiles))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }));
});

gulp.task('lint', ['jscs', 'jshint']);

gulp.task('test', function(done) {
  var Karma = require('karma').Server;

  return new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean:serve', function() {
  var del = require('del');
  return del(config.serveDirectory);
});

gulp.task('copy:serve', ['clean:serve', 'lint', 'test'],function() {
  var bowerFiles = require('main-bower-files');
  var fileSorter = require('gulp-angular-filesort');
  var inject = require('gulp-inject');

  var jsLocation = config.serveDirectory + 'js/';

  var vendorScript = gulp.src(bowerFiles('**/*.js'))
    .pipe(gulp.dest(jsLocation));

  var appScript = gulp.src(config.appJSFiles)
    .pipe(fileSorter())
    .pipe(gulp.dest(jsLocation));

  return gulp.src(config.indexHtmlFile)
    .pipe(gulp.dest(config.serveDirectory))
    .pipe(inject(vendorScript, { relative: true, name: 'vendor' }))
    .pipe(inject(appScript, { relative: true, name: 'app' }))
    .pipe(gulp.dest(config.serveDirectory));
});

var browserSync = require('browser-sync').create();

gulp.task('serve', ['copy:serve'], function() {
  browserSync.init({
    server: config.serveDirectory
  });

  return gulp.watch([config.indexHtmlFile, config.appJSFiles], ['watch:serve']);
});

gulp.task('watch:serve', ['copy:serve'], browserSync.reload);

gulp.task('clean:build', function() {
  var del = require('del');
  return del([config.distDirectory, config.coverageDirectory]);
});

gulp.task('build', ['clean:build', 'lint', 'test'], function() {
  var bowerFiles = require('main-bower-files');
  var fileSorter = require('gulp-angular-filesort');
  var sourceMaps = require('gulp-sourcemaps');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var rev = require('gulp-rev');
  var annotate = require('gulp-ng-annotate');
  var inject = require('gulp-inject');
  var htmlMin = require('gulp-htmlmin');

  var jsLocation = config.distDirectory + 'js/';

  var vendorScript = gulp.src(bowerFiles('**/*.js'))
    .pipe(sourceMaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(rev())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(jsLocation));

  var appScript = gulp.src(config.appJSFiles)
    .pipe(fileSorter())
    .pipe(sourceMaps.init())
    .pipe(concat('app.js'))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(rev())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(jsLocation));

  return gulp.src(config.indexHtmlFile)
    .pipe(gulp.dest(config.distDirectory))
    .pipe(inject(vendorScript, { relative: true, name: 'vendor' }))
    .pipe(inject(appScript, { relative: true, name: 'app' }))
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.distDirectory));
});

gulp.task('default', ['build']);
