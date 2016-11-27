'use strict';

var _ = require('underscore'),
  qs = require('querystring'),
  env = require('dotenv');

env.load();

var utils = {
  crawler: './crawler/crawler',
};

exports = module.exports = function(grunt, done, env, target, args) {
  env = env && env.toUpperCase();
  if (!env) {
    env = 'DEV';
  }
  process.env.NODE_ENV = env;

  if (target && _.contains(_.keys(utils), target)) {
    grunt.option('stack', true);
    grunt.log.writeln();
    var options = qs.parse(args) || {};
    require(utils[target])(options, function(err, response) {
      if (err) {
        grunt.option('stack', false);
        grunt.log.error(err);
        done(false);
      } else {
        if (response) {
          grunt.log.writeln(response);
        }
        done();
      }
    });
  } else {
    grunt.log.error('');
    grunt.log.writeln('Usage:');
    grunt.log.writeln('grunt utils --target=utilityName [--env=dev|prod] [--args="arg1=argValue"]');
    grunt.log.writeln();
    grunt.log.writeln('Available utils:');
    _.each(utils, function(value, key) {
      grunt.log.writeln(' - ' + key);
    });
    done(false);
  }
};
