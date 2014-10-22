var gulp = require('gulp'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  emberTemplates = require('gulp-ember-templates'),
  changed = require('gulp-changed'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  path = require('path');

var paths = {
  less: {
    root: 'app/styles/',
    files: ['app/styles/**/*.less']
  },
  ember: {
    app: {
      root: 'app/',
      // Define load order for ember objects.
      // TODO: introduce module system to manage dependencies
      files: [
        // first create the App object
        'app/app.js', 
        // base classes
        'app/controllers/shared/**',
        // models need to be defined before fixtures
        'app/models/**',
        'app/fixtures/**', 
        // the remainder are order-agnostic
        'app/**/*.js'
      ]
    },
    templates: {
      root: 'app/templates/',
      files: ['app/templates/**/*.hbs']
    }
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
      'vendor/ember/ember.js',
      'vendor/ember-data/ember-data.js',
      'vendor/handlebars/handlebars.min.js',
      'vendor/jquery/dist/jquery.min.js',
      'vendor/jquery/dist/jquery.min.map',
      'vendor/bootstrap/dist/css/bootstrap.min.css',
      'vendor/bootstrap/dist/css/bootstrap.css.map'
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
  test: {
    root: 'tests/',
    files: ['tests/**/*.js']
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
    .pipe(livereload());
});

gulp.task('styles', function() {
  return gulp.src(paths.less.files)
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(minifycss())
    .pipe(sourcemaps.write('./', { sourceRoot: paths.less.root }))
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(livereload());
});

gulp.task('emberApp', ['emberTemplates'], function() {
  return gulp.src(paths.ember.app.files, { base: 'app' })
    .pipe(jshint(path.join(paths.ember.app.root, '.jshintrc')))
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./', { sourceRoot: paths.ember.app.root }))
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(livereload());
});

gulp.task('emberTemplates', function() {
  return gulp.src(paths.ember.templates.files)
    .pipe(emberTemplates({ name: { replace: '\\', with: '/' } }))
    .pipe(sourcemaps.init())
      .pipe(concat('templates.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./', { sourceRoot: paths.ember.templates.root }))
    .pipe(gulp.dest(paths.dist.assets))
    .pipe(livereload());
});

gulp.task('vendor', function() {
  return gulp.src(paths.vendor)
    .pipe(changed(paths.dist.vendor))
    .pipe(gulp.dest(paths.dist.vendor))
    .pipe(livereload());
});

gulp.task('server', ['server node_modules'], function() {
  return gulp.src(paths.server.files)
    .pipe(jshint(path.join(paths.server.root, '.jshintrc')))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(paths.dist.server))
    .pipe(livereload());
});

gulp.task('server node_modules', function() {
  // copy node_modules listed in paths.server.modules to node_modules in paths.dist.server
  return gulp.src(paths.server.modules.map(function(m) {
    return path.join('node_modules', m, '/**');
  }), { base: './' })
  .pipe(changed(paths.dist.server))
  .pipe(gulp.dest(paths.dist.server));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.public.files, ['public']);
  gulp.watch(paths.less.files, ['styles']);
  gulp.watch(paths.ember.app.files, ['emberApp']);
  gulp.watch(paths.ember.templates.files, ['emberTemplates']);
  gulp.watch(paths.vendor, ['vendor']);
  gulp.watch(paths.server.files, ['server']);
});

gulp.task('default', function() {
  gulp.start('public', 'styles', 'emberApp', 'vendor', 'server');
});
