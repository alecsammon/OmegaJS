module.exports = function (grunt) {
  'use strict';

  /**
   * grunt jslint
   * Runs jshint over the codebase and reports errors
   */
  grunt.registerTask('jslint', 'jshint');
  
  /**
   * grunt csslint
   * Runs csslint over the codebase and reports errors
   */
  grunt.registerTask('csslint', 'csslint');
  
  /**
   * grunt test
   * Runs the cucumber tests
   */
  grunt.registerTask('test', 'cucumberjs');
  
  // ---

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-cucumber');
  
  grunt.initConfig({
    csslint: {
      options: {
        csslintrc: '.csslintrc',
        import: 2
      },
      src: [
        'omega/**/*.css',
        'boxy/**/*.css',
        'shooter/**/*.css'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'omega/lib/*'
        ]
      },
      core: [
        'Gruntfile.js',
        'omega/**/*.js',
        'boxy/**/*.js',
        'shooter/**/*.js',
        'features/step_definitions/*.js'
      ]
    },
    cucumberjs: {
      omega: 'features',
      options: {
        format: 'pretty',
        steps: 'features'
      }
    }
  });

};
