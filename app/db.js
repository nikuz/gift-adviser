'use strict';

var mysql = require('mysql'),
  EventEmitter = require('events').EventEmitter,
  _ = require('underscore'),
  validator = require('./modules/validator'),
  log = require('./modules/log'),
  constants = require('./constants')(),
  connection;

if (!connection) {
  connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
  });
}

// ----------------
// public functions
// ----------------

function createTable(options = {}, callback = _.noop) {
  var workflow = new EventEmitter();

  workflow.on('validateParams', function() {
    validator.check({
      name: ['string', options.name],
      fields: ['object', options.fields],
    }, function(err) {
      if (err) {
        callback(err);
      } else {
        workflow.emit('create');
      }
    });
  });

  workflow.on('create', function() {
    var query = `CREATE TABLE IF NOT EXISTS ${options.name} (${
      _.map(options.fields, function(value, key) {
        return `${key} ${value}`;
      })
    })`;

    connection.query(query, callback);
  });

  workflow.emit('validateParams');
}

function select(options = {}, callback = _.noop) {
  var workflow = new EventEmitter();

  workflow.on('validateParams', function() {
    validator.check({
      from: ['string', options.from],
      fields: ['array', options.fields],
      where: ['string', options.where]
    }, function(err) {
      if (err) {
        callback(err);
      } else {
        workflow.emit('select');
      }
    });
  });

  workflow.on('select', function() {
    var query = `SELECT ?? FROM ${options.from} WHERE ${options.where}`;

    connection.query(query, [options.fields], callback);
  });

  workflow.emit('validateParams');
}

function insert(options = {}, callback = _.noop) {
  var workflow = new EventEmitter();

  workflow.on('validateParams', function() {
    validator.check({
      to: ['string', options.to],
      fields: ['object', options.fields]
    }, function(err) {
      if (err) {
        callback(err);
      } else {
        workflow.emit('insert');
      }
    });
  });

  workflow.on('insert', function() {
    var fields = _.keys(options.fields),
      values = _.values(options.fields),
      query = `INSERT INTO ${options.to}(??) VALUES(?)`;
    
    console.log(mysql.format(query, [fields, values]));
    connection.query(query, [fields, values], callback);
  });

  workflow.emit('validateParams');
}

// ---------
// interface
// ---------

exports = module.exports = {
  createTable,
  select,
  insert
};
