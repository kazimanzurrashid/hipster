var gulp = require('gulp');

var appDirectory = './src';
var specDirectory = './specs';

var config = {
  indexHtmlFile: appDirectory + '/index.html',
  appJSFiles: [
    appDirectory + '/js/**/*.js'
  ],
  specJSFiles: [
    specDirectory + '/**/*.js'
  ],
  distDirectory: './dist/'
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

gulp.task('clean', function() {
  var del = require('del');
  return del(config.distDirectory);
});

gulp.task('build', ['clean', 'lint'], function() {
  var bowerFiles = require('main-bower-files')
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
    .pipe(htmlMin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(config.distDirectory));
});
