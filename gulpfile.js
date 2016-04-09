var gulp = require('gulp'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  ngHtml2Js = require("gulp-ng-html2js"),
  ngAnnotate = require('gulp-ng-annotate'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  changed = require('gulp-changed'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  config = require('./package.json'),
  protractor = require('gulp-protractor').protractor,
  path = require('path');

var testUrl = 'http://localhost:9002';

var paths = {
  web: {
    less: {
      root: 'web/app/styles/',
      files: ['web/app/styles/**/*.less']
    },
    app: {
      root: 'web/app/',
      files: 'web/app/**/*.js'
    },
    templates: {
      root: 'web/app/',
      files: 'web/app/**/*.tpl.html'
    },
    dist: {
      root: 'dist/web/',
      files: 'dist/web/**',
      public: 'dist/web/public',
      assets: 'dist/web/public/assets',
      vendor: 'dist/web/public/vendor',
      server: 'dist/web/'
    },
    public: {
      root: 'web/app/public/',
      files: 'web/app/public/**'
    },
    vendor: [
        'web/vendor/angular/angular.js',
        'web/vendor/angular-ui-router/release/angular-ui-router.js',
        'web/vendor/bootstrap/dist/css/bootstrap.css',
        'web/vendor/lodash/dist/lodash.min.js'
    ],
    server: {
      root: 'web/server/',
      files: ['web/server/**/*.js'],
      // node_modules that the server application depends on
      modules: [
        'express',
        'mime'
      ]
    },
    tests: {
      acceptance: {
        specs: 'web/tests/acceptance/**.spec.js',
        config: 'web/tests/protractor.conf.js'
      }
    }
  },
  api: {
    dist: {
      root: 'dist/api/',
      files: 'dist/api/**',
      server: 'dist/api/'
    },
    server: {
      root: 'api/server/',
      files: ['api/server/**/*.js']
    },
    test: {
      root: 'api/tests/',
      files: ['api/tests/**/*.js']
    }
  }
};

//----------------------------------------------------------------------
// Api Tasks

gulp.task('clean:api', function(cb) {
  del(paths.api.dist.files, cb);
});

gulp.task('build:api:server', ['build:api:server:node_modules'], function() {
  return gulp.src(paths.api.server.files)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.api.dist.server));
});

gulp.task('build:api:lint-tests', function() {
  return gulp.src(paths.api.test.files)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('build:api:server:node_modules', function() {
  // copy node_modules listed in paths.server.modules to node_modules in paths.dist.server
  return gulp.src(Object.keys(config.dependencies).map(function(m) {
    return path.join('node_modules', m, '/**');
  }), { base: './' })
  .pipe(changed(paths.api.dist.server))
  .pipe(gulp.dest(paths.api.dist.server));
});


//----------------------------------------------------------------------
// Web Tasks

gulp.task('clean:web', function(cb) {
  del(paths.web.dist.files, cb);
});

gulp.task('build:web:public', function() {
  return gulp.src(paths.web.public.files)
    .pipe(gulp.dest(paths.web.dist.public))
    .pipe(livereload({ auto: false }));
});

gulp.task('build:web:styles', function() {
  return gulp.src(paths.web.less.files)
    .pipe(less())
    .pipe(gulp.dest(paths.web.dist.assets))
    .pipe(livereload({ auto: false }));
});

gulp.task('build:web:app', ['build:web:templates'], function() {
  return gulp.src(paths.web.app.files, { base: 'app' })
    .pipe(jshint(path.join(paths.web.app.root, '.jshintrc')))
    .pipe(jshint.reporter('default'))
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.web.dist.assets))
    .pipe(livereload({ auto: false }));
});

gulp.task('build:web:templates', function() {
  return gulp.src(paths.web.templates.files)
    .pipe(ngHtml2Js({ moduleName: 'thedebate.templates' }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.web.dist.assets))
    .pipe(livereload({ auto: false }));
});

gulp.task('build:web:vendor', function() {
  return gulp.src(paths.web.vendor)
    .pipe(changed(paths.web.dist.vendor))
    .pipe(gulp.dest(paths.web.dist.vendor))
    .pipe(livereload({ auto: false }));
});

gulp.task('build:web:server', ['copy:web:server:node_modules'], function() {
  return gulp.src(paths.web.server.files)
    .pipe(jshint(path.join(paths.web.server.root, '.jshintrc')))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.web.dist.server))
    .pipe(livereload({ auto: false }));
});

gulp.task('copy:web:server:node_modules', function() {
  // copy node_modules listed in paths.server.modules to node_modules in paths.dist.server
  return gulp.src(paths.web.server.modules.map(function(m) {
    return path.join('node_modules', m, '/**');
  }), { base: './' })
  .pipe(changed(paths.web.dist.server))
  .pipe(gulp.dest(paths.web.dist.server));
});

gulp.task('test:web', function(cb) {
  gulp.src(paths.web.tests.acceptance.specs)
    .pipe(protractor({
      configFile: paths.web.tests.acceptance.config,
      args: ['--baseUrl', 'http://localhost:9002']
    }))
    .on('error', function(e) { throw e });
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.web.public.files, ['build:web:public']);
  gulp.watch(paths.web.less.files, ['build:web:styles']);
  gulp.watch(paths.web.app.files, ['build:web:app']);
  gulp.watch(paths.web.templates.files, ['build:web:templates']);
  gulp.watch(paths.web.vendor, ['build:web:vendor']);
  gulp.watch(paths.web.server.files, ['build:web:server']);
});

gulp.task('watch', function() {
  gulp.watch(paths.server.files, ['server']);
  gulp.watch(paths.test.files, ['lint-tests']);
});

gulp.task('default', function() {
  gulp.start(
    'build:api:server',
    'build:web:public',
    'build:web:styles',
    'build:web:app',
    'build:web:vendor',
    'build:web:server'
  );
});
