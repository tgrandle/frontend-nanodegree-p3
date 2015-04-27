'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: '.',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint','jscs']
      }
    },


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        //'<%= config.app %>/js/{,*/}*.js'
        '<%= config.app %>/js/app.js'
      ]
    },

    jscs: {
      src: '<%= config.app %>/js/app.js',
      options: {
          config: '.jscsrc',
          requireCurlyBraces: [ 'if' ]
      }
    }
  });

  grunt.registerTask('build', [
      //
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'build'
  ]);
};
