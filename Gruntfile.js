module.exports = function(grunt) {
  grunt.initConfig({
    ejs: {
      all: {
        src: ['views/*.ejs'],
        dest: 'public/index.html'
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
        files: ['views/**/*.ejs', 'styles/**/*.less', 'tests/**/*.js', 'public/js/**/*.js', '!public/js/lib/**'],
        tasks: ['ejs','less','jshint'],
        options: {
          spawn: false
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint','ejs','less']);
};