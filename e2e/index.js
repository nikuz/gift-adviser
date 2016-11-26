'use strict';

var _ = require('underscore'),
  env = require('dotenv');

env.load();

process.env.NODE_ENV = 'TEST';

var tests = [

];

describe('gift-adviser-api API tests', function() {
  if (process.env.TEST_TARGET) {
    var target = './' + process.env.TEST_TARGET;
    if (_.contains(tests, target)) {
      require(target);
    } else {
      console.log('Target test doesn\'t exists');
    }
  } else {
    _.each(tests, function(item) {
      require(item);
    });
  }
});
