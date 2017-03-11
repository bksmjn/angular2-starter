var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var copy = require('gulp-copy');
var open = require('gulp-open');
var sass = require('gulp-sass');
var debug = require('gulp-debug');
var replace = require('gulp-replace');

var config = require('./config/local.env.js');

gulp.task('clean', function() {
    del([
      './www'
    ])
});

gulp.task('scripts', function () {
  return gulp.src([
    'typings/**/*.ts',
    'app/**/*.ts'])
//    .pipe(debug({title: 'scripts src'}))
    .pipe(sourcemaps.init())
    .pipe(ts({
      'target': 'es5',
      'module': 'commonjs',
      'moduleResolution': 'node',
      'sourceMap': true,
      'emitDecoratorMetadata': true,
      'experimentalDecorators': true,
      'removeComments': false,
      'noImplicitAny': false,
      'rootDir' : './',
      'outDir' : './'
    }))
    //.pipe(sourcemaps.write('./'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/app'))
});

/**
 * Remember, by sass rules sass to be imported need to lead with a _ in the file name.  These will not be compiled.
 * This allows to compile all of the app scss, whether an angular component's scss or the global app.scss.  Each of these
 * can import any _...
 */
gulp.task('sass', function () {
  return gulp.src(['./app/**/*.scss'])
//    .pipe(debug({title: 'sass'}))
    .pipe(sass({includePaths:config.sass.includePaths}).on('error', sass.logError))
    .pipe(gulp.dest('./www/app'))
//    .pipe(debug({title: 'sass'}))
});



gulp.task('copy', function () {
  return gulp.src(
    [
      './index.html',
      './systemjs.config.js',
      'app/**/*.html',
      'assets/**/*.*',
      'node_modules/@angular/**/*.*',
      'node_modules/angular2-in-memory-web-api/**/*.*',
      'node_modules/rxjs/**/*.*',
      'node_modules/core-js/**/*.*',
      'node_modules/zone.js/**/*.*',
      'node_modules/reflect-metadata/**/*.*',
      'node_modules/systemjs/**/*.*',
      'node_modules/jquery/**/*.*',
      'node_modules/what-input/**/*.*',
      'node_modules/foundation-sites/**/*.*',
      'node_modules/moment/**/*.*',
      'node_modules/lodash/**/*.*',
      'node_modules/lodash/**/*.*',
      'node_modules/moment/**/*.*',
      'node_modules/keycode/**/*.*',
      'node_modules/font-awesome/**/*.*',
      'node_modules/esrever/**/*.*',
      'node_modules/angular2-jwt/**/*.*'
    ])
    //    .pipe(debug({title:'Copy'}))
    .pipe(copy('./www'));
});


gulp.task('reload-copy',['replace-in-templates'], function() {
  return gulp.src('./www/index.html').pipe(connect.reload());
});

gulp.task('reload-css',['sass'], function() {
  return gulp.src('./www/**/*.css').pipe(connect.reload());
});


gulp.task('reload-scripts',['replace-in-scripts'], function() {
  return gulp.src('./www/**/*.js').pipe(connect.reload());
});

gulp.task('replace-in-scripts', ['scripts'], function () {

  gulp.src(['www/app/util/mode.js'])
//    .pipe(debug({title: 'replace @@OperatingMode'}))
    .pipe(replace('@@OperatingMode' , config.operatingMode.mode))
    .pipe(gulp.dest('www/app/util'));

    gulp.src(['www/app/util/debug.js'])
  //    .pipe(debug({title: 'replace @@Trace'}))
    .pipe(replace('@@Trace' , config.logging.trace))
    .pipe(gulp.dest('www/app/util'));

    gulp.src(['www/app/services/BackendServiceBase.js'])
//    .pipe(debug({title: 'replace @@SimulatedRestTimeout'}))
    .pipe(replace('@@SimulatedRestTimeout', config.operatingMode.mode.simulatedRestTimeout))
    .pipe(gulp.dest('www/app/services'));

});

gulp.task('replace-in-templates', ['copy'], function () {
  gulp.src(['www/index.html'])
  //    .pipe(debug({title: 'replace @@base'}))
    .pipe(replace('@@title', config.title))
    .pipe(replace('@@base' , config.indexHtmlBase))
    .pipe(gulp.dest('www'));
});

gulp.task('watchSource', ['replace-in-scripts','replace-in-templates','sass'], function () {
  gulp.watch('app/**/*.ts',['reload-scripts']);
  gulp.watch('app/**/*.html',['reload-copy']);
  gulp.watch('app/**/*.scss',['reload-css']);
});

gulp.task('serve', ['watchSource'], function (){
  connect.server({
    root: ['./www'],
    port: config.server.port,
    host: config.server.host,
    livereload: true,
    fallback: './www/index.html',
//    debug:true,
    middleware: function(connect, o) {
      return [(function () {
        var url = require('url');
        var proxy = require('proxy-middleware');
        var options = url.parse('http://' + config.server.proxyHost + ':' + config.server.proxyPort + '/api');
        options.route = '/api';
        return proxy(options);
      })()];
    }
  })
});

gulp.task('browser', ['serve'], function(){
  var options = {
    uri: 'http://' + config.server.host + ':' + config.server.port,
    app: config.browserConfig[config.browser]
  };
  gulp.src(__filename)
    .pipe(open(options))
    .pipe(debug({title: 'browser'}));
});

gulp.task('printConfig', function () {
  console.log(config);
});


gulp.task('default', [
  'printConfig',
  'scripts',
  'copy',
  'sass',
  'watchSource',
  'serve',
  'browser'
]);

gulp.task('build',[
  'printConfig',
  'replace-in-scripts',
  'replace-in-templates',
  'sass',
]);
