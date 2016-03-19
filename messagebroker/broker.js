// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const redis = require('redis');

class Broker
{
  constructor (config) {
    if (config.host) {
      this.client = redis.createClient(config.host,config.port);
      this.client.auth(config.pass);
    } else {
      this.client = redis.createClient();
    }
  }
}

module.exports = Broker;
