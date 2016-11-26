'use strict';

var validator = require('../app/modules/validator'),
  EventEmitter = require('events').EventEmitter,
  jsdom = require('jsdom');

exports = module.exports = function(options, callback) {
  var workflow = new EventEmitter(),
    opts = options || {},
    cb = callback,
    url = opts.url;

  workflow.on('validateParams', function() {
    validator.check({
      url: ['string', url]
    }, function(err) {
      if (err) {
        cb(err);
      } else {
        workflow.emit('crawl');
      }
    });
  });

  workflow.on('crawl', function() {
    jsdom.env(
      url,
      ["http://code.jquery.com/jquery.js"],
      function(err, window) {
        if (err) {
          cb(err);
        } else {
          console.log(window.$('#productTitle').text());
          cb();
        }
      }
    );
  });

  workflow.emit('validateParams');
};
