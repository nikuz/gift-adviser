'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  controllers = require('./controllers/index'),
  path = require('path');

exports = module.exports = function(app) {
  // settings
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.raw({
    type: 'application/yaml'
  }));
  app.use(bodyParser.json());

  // swagger editor
  app.use('/docs', express.static(__dirname + '/../public/swagger'));
  app.use('/api.yaml', express.static(__dirname + '/../api.yaml'));
  app.use('/docs/editor', express.static(__dirname + '/../public/swagger-editor'));
  app.use('/docs/editor/specs', express.static(__dirname + '/../api.yaml'));
  app.put('/docs/editor/specs', controllers.utils.storeApi);

  // main page
  // app.use(express.static(__dirname + '/../public/homepage'));
  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/homepage/index.html'));
  });
  app.use('/images', express.static(__dirname + '/../public/homepage/images'));
  app.use('/i', express.static(__dirname + '/../public/homepage/i'));
};
