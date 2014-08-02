module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['**/*.js', '!**/node_modules/**', '!public/js/lib/**'],
      options: {
        globals: {
        }
      }
    },

    exec: {
      uitests: 'casperjs test tests/ui-tests.js'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['jshint','exec:uitests']);
};