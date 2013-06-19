/*global module:true */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      core: [
        'Gruntfile.js',
        'js/*.js',
        'js/entity/*.js',
        'js/omega/*.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('lint', 'jshint');

};
