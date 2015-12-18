var _           = require('lodash');
var del         = require('del');
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var Server      = require('karma').Server;

var paths = {
  src:   __dirname + '/src',
  dist:  __dirname + '/dist',
  bower: __dirname + '/src/bower_components'
};

var patterns = {
  js          : paths.src + '/app/**/*.js',
  bower       : paths.src + '/bower_components/**/*.@(css|png|jpg|jpeg|tiff|gif|woff|woff2|ttf|otf|svg)',
  sass        : paths.src + '/app/**/*.scss',
  ngtemplates : paths.src + '/app/**/*.html',
  appJson     : paths.src + '/app/**/*.json',
  json        : paths.src + '/data/**/*.json',
  data        : paths.src + '/data/**/*.!(json)',
  appImages   : paths.src + '/app/**/*.@(png|gif|jpg|jpeg|tiff)',
  images      : paths.src + '/images/**/*',
  fonts       : paths.src + '/fonts/**/*'
};

gulp.task('clean', function () {
  return del([paths.dist + '/**/*']);
});

gulp.task('appJson', function(){
  var dest = paths.dist + '/app';
  return gulp.src(patterns.appJson)
    .pipe($.newer(dest))
    .pipe($.jsonminify())
    .pipe(gulp.dest(dest));
});

gulp.task('json', function(){
  var dest = paths.dist + '/data';
  return gulp.src(patterns.json)
    .pipe($.newer(dest))
    .pipe($.jsonminify())
    .pipe(gulp.dest(dest));
});

gulp.task('data', function(){
  var dest = paths.dist + '/data';
  return gulp.src(patterns.data)
    .pipe($.newer(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('fonts', function(){
  var dest = paths.dist + '/fonts';
  return gulp.src(patterns.fonts)
    .pipe($.newer(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('bower', function(){
  var dest = paths.dist + '/bower_components';
  return gulp.src(patterns.bower)
    .pipe($.newer(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('appImages', function(){
  var dest = paths.dist + '/app';
  return gulp.src(patterns.appImages)
    .pipe($.newer(dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(dest));
});

gulp.task('images', function(){
  var dest = paths.dist + '/images';
  return gulp.src(patterns.images)
    .pipe($.newer(dest))
    .pipe($.imagemin())
    .pipe(gulp.dest(dest));
});

gulp.task('sass', function () {
  return gulp.src(patterns.sass)
    .pipe($.newer(paths.dist + '/app/main.css'))
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe(gulp.dest(paths.dist + '/app'));
});

gulp.task('ngtemplates', function () {
  return gulp.src(patterns.ngtemplates)
    .pipe($.newer(paths.dist + '/app/bundle.ngtemplates.js'))
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true
    }))
    .pipe($.ngTemplates({
      filename: 'bundle.ngtemplates.js',
      module: 'pulseTools',
      standalone: false
    }))
    .pipe(gulp.dest(paths.dist + '/app'));
});

var webpackConfig = {
  output: {
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module:{
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    alias: {
      'angular-d3kit-adapter': paths.bower + '/angular-d3kit-adapter/dist/angular-d3kit-adapter.js',
      'angular-json-editor':   paths.src + '/vendor/angular-json-editor/angular-json-editor-custom.js',
      'axios':                 paths.bower + '/axios/dist/axios.min.js',
      'd3':                    paths.bower + '/d3/d3.min.js',
      'd3Kit':                 paths.bower + '/d3kit/dist/d3kit.min.js',
      'filesaver':             paths.bower + '/file-saver.js/FileSaver.js',
      'jquery':                paths.bower + '/jquery/dist/jquery.min.js',
      'json-editor':           paths.bower + '/json-editor/dist/jsoneditor.min.js',
      'moment':                paths.bower + '/moment/min/moment.min.js',
      'moment-timezone':       paths.bower + '/moment-timezone/builds/moment-timezone-with-data-2010-2020.min.js',
      'select2':               paths.bower + '/select2/dist/js/select2.min.js'
    }
  }
};

gulp.task('webpack:dev', function() {
  return gulp.src(paths.src + '/app/main.js')
    .pipe($.webpack(_.extend({}, webpackConfig, {
      devtool: 'eval' // '#cheap-module-eval-source-map'
    })))
    .pipe(gulp.dest(paths.dist + '/app'));
});

gulp.task('webpack:prod', function() {
  return gulp.src(paths.src + '/app/main.js')
    .pipe($.webpack(webpackConfig))
    .pipe($.uglify({
      report: 'min',
      mangle: false,
      compress: false, //true,
      preserveComments: false
    }))
    .pipe(gulp.dest(paths.dist + '/app'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('browser-sync', ['server:dev'], function() {
  var SERVER_PORT = process.env.PORT || 7008;
  browserSync.init(null, {
    proxy: 'http://localhost:' + SERVER_PORT,
    files: ['dist/**/*.*', 'server/**/*.ejs'],
    browser: 'google chrome',
    port: 7000,
  });
});

gulp.task('server:dev', ['build:dev'], function (cb) {
  var started = false;
  $.nodemon({
    script: 'server.js',
    nodeArgs: ['--debug', '--harmony'],
    ignore: ['node_modules/**', 'src/**/*', 'dist/**/*'],
    ext: 'js, ejs',
    env: { NODE_ENV: 'development' }
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('server:prod', ['build'], function (cb) {
  var started = false;
  $.nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony'],
    ignore: ['node_modules/**', 'src/**/*', 'dist/**/*'],
    ext: 'js, ejs',
    env: { NODE_ENV: 'production' }
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

var buildTasks = [
  'bower',
  'sass',
  'ngtemplates',
  'appJson',
  'json',
  'data',
  'appImages',
  'images',
  'fonts'
];

gulp.task('watch', ['build:dev'], function(){
  buildTasks.forEach(function(task){
    gulp.watch(patterns[task], [task]);
  });

  gulp.watch(patterns.js,  ['webpack:dev']);
});

gulp.task('build:dev', buildTasks.concat(['webpack:dev']));
gulp.task('build', buildTasks.concat(['webpack:prod']));

gulp.task('dev', ['watch', 'browser-sync']);
gulp.task('prod', ['server:prod']);
gulp.task('default', ['dev']);