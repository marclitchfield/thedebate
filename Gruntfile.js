module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      default: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'public/index.html': 'views/index.jade'
        }
      }
    },

    less: {
      default: {
        options: {
          cleancss: true
        },
        files: {
          'public/css/main.css': 'styles/main.less'
        }
      }
    },

    jshint: {
      files: ['**/*.js', '!**/node_modules/**', '!public/js/lib/**'],
      options: {
        globals: {
        }
      }
    },

    watch: {
      scripts: {
        files: ['views/**/*.jade', 'styles/**/*.less', 'tests/**/*.js', 'public/js/**/*.js', '!public/js/lib/**'],
        tasks: ['jade','less','jshint'],
        options: {
          spawn: false
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['jshint','jade','less']);
};