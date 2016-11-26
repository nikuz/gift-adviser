'use strict';

var _ = require('underscore'),
  env = require('dotenv');

env.load();

process.env.NODE_ENV = 'TEST';

var specs = [

];

describe('gift-adviser-api specs tests', function() {
  if (process.env.SPECS_TARGET) {
    var target = './' + process.env.SPECS_TARGET;
    if (_.contains(specs, target)) {
      require(target);
    } else {
      console.log('Target specs doesn\'t exists');
    }
  } else {
    _.each(specs, function(item) {
      require(item);
    });
  }
});
