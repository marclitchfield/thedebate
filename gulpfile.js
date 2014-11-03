var gulp = require('gulp'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  ngHtml2Js = require("gulp-ng-html2js"),
  ngAnnotate = require('gulp-ng-annotate'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  changed = require('gulp-changed'),
  livereload = require('gulp-livereload'),
  protractor = require("gulp-protractor").protractor,
  del = require('del'),
  path = require('path');

var testUrl = 'http://localhost:9002';

var paths = {
  less: {
    root: 'app/styles/',
    files: ['app/styles/**/*.less']
  },
  app: {
    root: 'app/',
    files: 'app/**/*.js'
  },
  templates: {
    root: 'app/',
    files: 'app/**/*.tpl.html'
  },
  dist: {
    root: 'dist/',
    files: 'dist/**',
    public: 'dist/public',
    assets: 'dist/public/assets',
    vendor: 'dist/public/vendor',
    server: 'dist'
  },
  public: {
    root: 'app/public/',
    files: 'app/public/**'
  },
  vendor: [
      'vendor/angular/angular.min.js',
      'vendor/angular/angular.min.js.map',
      'vendor/angular-ui-router/release/angular-ui-router.min.js',
      'vendor/bootstrap/dist/css/bootstrap.min.css',
      'vendor/bootstrap/dist/css/bootstrap.css.map',
      'vendor/lodash/dist/lodash.min.js'
  ],
  server: {
    root: 'server/',
    files: ['server/**/*.js'],
    // node_modules that the server application depends on
    modules: [
      'express',
      'mime'
    ]
  },
  tests: {
    acceptance: {
      specs: 'tests/acceptance/**.spec.js',
      config: 'tests/protractor.conf.js'
    }
  }
};

//----------------------------------------------------------------------
// Tasks

gulp.task('clean', function(cb) {
  del(paths.dist.files, cb);
});

gulp.task('public', function() {
  return gulp.src(paths.public.files)
    .pipe(gulp.dest(paths.dist.public))
    .pipe(livereload({ auto: false }));
});

gulp.task('styles', function() {
  return gulp.src(paths.less.files)
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(minifycss())
    .pipe(sourcemaps.write('./', { sourceRoot: paths.less.root }))
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(livereload({ auto: false }));
});

gulp.task('app', ['templates'], function() {
  return gulp.src(paths.app.files, { base: 'app' })
    .pipe(jshint(path.join(paths.app.root, '.jshintrc')))
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
      .pipe(ngAnnotate())
      .pipe(concat('app.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./', { sourceRoot: paths.app.root }))
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(livereload({ auto: false }));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates.files)
    .pipe(ngHtml2Js({ moduleName: 'thedebate.templates' }))
    .pipe(sourcemaps.init())
      .pipe(concat('templates.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./', { sourceRoot: paths.templates.root }))
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(livereload({ auto: false }));
});

gulp.task('vendor', function() {
  return gulp.src(paths.vendor)
    .pipe(changed(paths.dist.vendor))
    .pipe(gulp.dest(paths.dist.vendor))
    .pipe(livereload({ auto: false }));
});

gulp.task('server', ['server node_modules'], function() {
  return gulp.src(paths.server.files)
    .pipe(jshint(path.join(paths.server.root, '.jshintrc')))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.dist.server))
    .pipe(livereload({ auto: false }));
});

gulp.task('server node_modules', function() {
  // copy node_modules listed in paths.server.modules to node_modules in paths.dist.server
  return gulp.src(paths.server.modules.map(function(m) {
    return path.join('node_modules', m, '/**');
  }), { base: './' })
  .pipe(changed(paths.dist.server))
  .pipe(gulp.dest(paths.dist.server));
});

gulp.task('test', function() {
  gulp.src(paths.tests.acceptance.specs)
    .pipe(protractor({
      configFile: paths.tests.acceptance.config,
      args: ['--baseUrl', 'http://localhost:9002']
    }))
    .on('error', function(e) { throw e });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.public.files, ['public']);
  gulp.watch(paths.less.files, ['styles']);
  gulp.watch(paths.app.files, ['app']);
  gulp.watch(paths.templates.files, ['templates']);
  gulp.watch(paths.vendor, ['vendor']);
  gulp.watch(paths.server.files, ['server']);
});

gulp.task('default', function() {
  gulp.start('public', 'styles', 'app', 'vendor', 'server');
});
