// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const redis = require('redis');

class Broker
{
  constructor (config,logger,cleancache) {
    if (config.host) {
      this.client = redis.createClient(config.port,config.host);
      this.client.auth(config.pass);
    } else {
      this.client = redis.createClient();
    }
    this.client.subscribe('SERVICE:APIGATEWAY');
    this.client.on('message',function (channel,message) {
      let service = channel.split(':')[1];
      let action = message.split(':')[0];
      if (service == 'APIGATEWAY' && action === 'CLEAN_CACHE') {
        if (logger) {
          logger.log('request MESSAGE : ' + message);
        }
        cleancache.execute(message.split(':')[1]);
      }
    });
  }
}

module.exports = Broker;
