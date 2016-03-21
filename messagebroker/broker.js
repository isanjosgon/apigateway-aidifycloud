// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const redis = require('redis');

class Broker
{
  constructor (config,logger) {
    if (config.host) {
      this.client = redis.createClient(config.host,config.port);
      this.client.auth(config.pass);
    } else {
      this.client = redis.createClient();
    }
    this.client.subscribe('SERVICE:APIGATEWAY');
    this.client.on('message',function (channel,message) {
      let service = channel.split(':')[1];
      if (service == 'APIGATEWAY') {
        console.log(message);
      }
    });
  }
}

module.exports = Broker;
