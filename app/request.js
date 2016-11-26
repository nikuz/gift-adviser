'use strict';

var request = require('request'),
  qs = require('querystring');

const noop = function() {};

function parseResponse(response) {
  var parsed;
  try {
    parsed = JSON.parse(response);
  } catch (e) {
    parsed = response;
  }
  return parsed;
}

function getRequest(uri, query, method, callback) {
  var cb = callback || noop;
  if (query) {
    uri += '?' + qs.stringify(query);
  }
  request[method]({
    uri: uri
  }, function(err, response, body) {
    if (err) {
      cb(err, undefined);
    } else {
      cb(err, parseResponse(body));
    }
  });
}

function postRequest(uri, data, method, callback) {
  var cb = callback || noop,
    requestParams = {};

  data = data || {};

  if (data['x-urlencoded']) {
    delete data['x-urlencode'];
    requestParams.form = data;
  } else {
    requestParams.headers = {
      'content-type': 'application/json; charset=UTF-8'
    };
    requestParams.body = JSON.stringify(data);
  }

  requestParams.uri = uri;
  request[method](requestParams, function(err, response, body) {
    if (err) {
      cb(err, undefined);
    } else {
      cb(err, parseResponse(body));
    }
  });
}

exports = module.exports = {
  get: function(uri, query, callback) {
    getRequest(uri, query, 'get', callback);
  },
  post: function(uri, data, callback) {
    postRequest(uri, data, 'post', callback);
  },
  put: function(uri, data, callback) {
    postRequest(uri, data, 'put', callback);
  },
  del: function(uri, query, callback) {
    getRequest(uri, query, 'del', callback);
  }
};
