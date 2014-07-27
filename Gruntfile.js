module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: ['tests/captures/**/Thumbs.db']
      }
    },

    jshint: {
      files: ['**/*.js', '!**/node_modules/**'],
      options: {
        globals: {
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);  
};