// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const config = require('../package.json');
const env = require('node-env-file');
let file = process.env.NODE_ENV || 'dev';
env(__dirname + '/.' + file);

module.exports = {
  environment : process.env.NODE_ENV || 'dev',
  restapi : {
    port : process.env.PORT || 5001,
    name : config.name,
    version : config.version
  },
  messagebroker : {
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    pass : process.env.REDIS_PASSWORD
  },
  logging : {
    appenders: [{
      type: 'file',
      filename: 'logs/error.log',
      category: 'error',
      maxLogSize: 20480,
      backups: 10
    },{
      type: 'file',
      filename: 'logs/info.log',
      category: 'info',
      maxLogSize: 20480,
      backups: 10
    },{
      type: 'file',
      filename: 'logs/debug.log',
      category: 'debug',
      maxLogSize: 20480,
      backups: 10
    }]
  }
}
